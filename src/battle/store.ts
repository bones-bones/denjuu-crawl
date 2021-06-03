import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';

import { denjuuList } from '../data';
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
    activePlayer: '1',
    battleLog: [],
    turnCount: 1,
};

export const startBattleThunk = (enemy: EnemyStats) => (
    dispatch: Dispatch,
    getState: () => RootState
) => {
    const { contactList } = getState() as RootState;

    const {
        instanceId,
        stats,
        temporalStats,
        moves,
        denjuuId,
        level,
    } = contactList.denjuu.find(
        ({ instanceId }) => contactList.activeDenju == instanceId
    )!;

    dispatch(
        startBattle({
            enemy,
            player: {
                instanceId,
                stats,
                temporalStats: { ...stats, hp: temporalStats.hp },
                moves,
                denjuuId,
                level,
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
            state.activePlayer = '1';
            state.p1 = { status: 'static', ...payload.player };
            state.p2 = { status: 'static', ...payload.enemy };
            state.winner = undefined; //overkill
            state.turnCount = 1;
        },
        showMove: (state, { payload }: PayloadAction<ActiveMove>) => {
            state.activeMoveInfo = payload;
        },
        nextTurn: (state) => {
            const p1SpeedFactor = 201 - state.p1?.temporalStats.speed!;
            const p2SpeedFactor = 201 - state.p2?.temporalStats.speed!;
            let knowAnswer = false;
            let counter = state.turnCount;

            if (
                counter % p2SpeedFactor === 0 &&
                counter % p1SpeedFactor === 0
            ) {
                knowAnswer = true;
                state.activePlayer = state.activePlayer === '1' ? '2' : '1';
                counter++;
            }

            while (!knowAnswer) {
                counter++;
                if (counter % p1SpeedFactor === 0) {
                    knowAnswer = true;
                    state.activePlayer = '1';
                } else if (counter % p2SpeedFactor === 0) {
                    knowAnswer = true;
                    state.activePlayer = '2';
                }
            }
            state.turnCount = counter;
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
                    ? `You've defeated ${
                          denjuuList[state.p2?.denjuuId!].displayId
                      }!`
                    : `You have been defeated by ${
                          denjuuList[state.p2?.denjuuId!].displayId
                      }...`
            );
            //winner: undefined
        },
        newBattleMessage: (state, { payload }: PayloadAction<string>) => {
            state.battleLog.unshift(payload);
        },
        p1TakeDamage: (
            state,
            { payload: { damage } }: PayloadAction<Damage>
        ) => {
            if (!state.p1) {
                return state;
            }
            state.p1.status = 'damage';
            state.p1.temporalStats.hp = Math.max(
                0,
                state.p1.temporalStats.hp - damage
            );
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
        p1StatModification: (
            state,
            { payload: { value, stat } }: PayloadAction<StatModification>
        ) => {
            if (!state.p1) {
                return state;
            }
            // 200 was the abitrary cap
            state.p1.temporalStats[stat] = Math.min(
                200,
                Math.max(0, state.p1.temporalStats[stat] + value)
            );
            console.log(`p1 ${stat} is ${state.p1.temporalStats[stat]}`);
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
    nextTurn,
    p1TakeDamage,
    p2TakeDamage,
    p2StatModification,
    p1StatModification,
} = battleSlice.actions;

export const delayedBattleMessageThunk = (
    message: string,
    delay: number = 500
) => (dispatch: Dispatch) => {
    setTimeout(() => {
        dispatch(newBattleMessage(message));
    }, delay);
};
