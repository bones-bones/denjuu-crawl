import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';

import { denjuuList } from '../data';
import { resetTemporalStats } from '../playerDenjuu';
import { RootState } from '../store';
import {
    ActiveMove,
    BattleStart,
    BattleState,
    Damage,
    EnemyStats,
    StatModification,
} from './types';

const initBattleState: BattleState = {

    battleLog: [],
};

export const startBattleThunk = (enemy: EnemyStats) => (
    dispatch: Dispatch,
    getState: () => RootState
) => {
    const {
        contactList: { activeDenju: instanceId },
    } = getState() as RootState;

    dispatch(resetTemporalStats({ instanceId }));

    dispatch(
        startBattle({
            enemy,
            player: {
                instanceId,
            },
        })
    );
};

export const battleSlice = createSlice({
    name: 'battle',
    initialState: initBattleState,
    reducers: {
        startBattle: (state, { payload }: PayloadAction<BattleStart>) => {
            state.battleLog = ['time to fight!'];
            state.p1 = { ...payload.player, status: 'static' };
            state.p2 = {
                ...payload.enemy,
                status: 'static',
                statusEffects: [],
            };
            state.winner = undefined; //overkill

        },
        showMove: (state, { payload }: PayloadAction<ActiveMove>) => {
            state.activeMoveInfo = payload;
        },
        clearMove: (state) => {
            state.activeMoveInfo = undefined;
            if (state.p1) {
                state.p1.status = 'static';
            }
            if (state.p2) {
                state.p2.status = 'static';
            }
        },
        declareWinner: (
            state,
            { payload }: PayloadAction<'player' | 'opponent'>
        ) => {
            console.log('Winner!');
            state.winner = payload;
            state.battleLog.unshift(
                payload == 'player'
                    ? `You've defeated ${denjuuList[state.p2?.denjuuId!].displayId
                    }!`
                    : `You have been defeated by ${denjuuList[state.p2?.denjuuId!].displayId
                    }...`
            );
            //winner: undefined
        },
        newBattleMessage: (state, { payload }: PayloadAction<string>) => {
            state.battleLog.unshift(payload);
        },
        p1TakeDamage: (state) => {
            if (!state.p1) {
                return state;
            }
            state.p1.status = 'damage';
            // state.p1.temporalStats.hp = Math.max(
            //     0,
            //     state.p1.temporalStats.hp - damage
            // );
        },
        p2TakeDamage: (
            state,
            { payload: { damage } }: PayloadAction<Damage>
        ) => {
            if (!state.p2) {
                return state;
            }
            state.p2.status = 'damage';
            state.p2.temporalStats.hp = Math.max(
                0,
                state.p2.temporalStats.hp - damage
            );
        },

        p2StatModification: (
            state,
            { payload: { value, stat } }: PayloadAction<StatModification>
        ) => {
            if (!state.p2) {
                return state;
            }
            // 200 was the abitrary cap
            state.p2.temporalStats[stat] = Math.min(
                200,
                Math.max(1, state.p2.temporalStats[stat] + value)
            );
            console.log(`p2 ${stat} is ${state.p2.temporalStats[stat]}`);
        },
    },
});
export const {
    startBattle,
    declareWinner,
    newBattleMessage,
    showMove,
    clearMove,
    p1TakeDamage,
    p2TakeDamage,
    p2StatModification,
} = battleSlice.actions;

export const delayedBattleMessageThunk = (
    message: string,
    delay: number = 500
) => (dispatch: Dispatch) => {
    setTimeout(() => {
        dispatch(newBattleMessage(message));
    }, delay);
};
