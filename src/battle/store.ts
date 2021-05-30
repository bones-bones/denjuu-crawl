import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import { denjuuList } from '../data';
import { EffectType, moveList } from '../data';
import { RootState } from '../store';
import {
    ActiveMove,
    Attack,
    BattleStart,
    BattleState,
    EnemyStats,
} from './types';

const initBattleState: BattleState = {
    activePlayer: 0,
    battleLog: [],
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
            state.activePlayer = 0;
            state.p1 = { status: 'static', ...payload.player };
            state.p2 = { status: 'static', ...payload.enemy };
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
        p1Attack: (state, { payload: { moveId } }: PayloadAction<Attack>) => {
            if (!state.p1 || !state.p2) {
                return state;
            }
            state.p1.status = 'attack';
            state.p1.activeMoveId = moveId;
            moveList[moveId].effects.forEach((effect) => {
                switch (effect.type) {
                    case EffectType.Damage: {
                        state.p2!.temporalStats.hp = Math.max(
                            0,
                            state.p2!.temporalStats.hp - effect.value!
                        );
                        break;
                    }
                }
            });
            state.p2.status = 'damage';
            state.activePlayer = 1;
            state.battleLog.unshift(
                `${denjuuList[state.p1.denjuuId].displayId} used ${
                    moveList[moveId].displayId
                }`
            );
        },
        p2Attack: (state, { payload: { moveId } }: PayloadAction<Attack>) => {
            if (!state.p1 || !state.p2) {
                return state;
            }
            state.p2.status = 'attack';
            state.p2.activeMoveId = moveId;
            moveList[moveId].effects.forEach((effect) => {
                switch (effect.type) {
                    case EffectType.Damage: {
                        state.p1!.temporalStats.hp = Math.max(
                            0,
                            state.p1!.temporalStats.hp - effect.value!
                        );
                        break;
                    }
                }
            });
            state.p1.status = 'damage';
            state.activePlayer = 0;
            state.battleLog.unshift(
                `${denjuuList[state.p2.denjuuId].displayId} used ${
                    moveList[moveId].displayId
                }`
            );
        },
    },
});
export const {
    p1Attack,
    startBattle,
    declareWinner,
    newBattleMessage,
    showMove,
    clearMove,
    p2Attack,
} = battleSlice.actions;

export const delayedBattleMessageThunk = (
    message: string,
    delay: number = 500
) => (dispatch: Dispatch) => {
    setTimeout(() => {
        dispatch(newBattleMessage(message));
    }, delay);
};
