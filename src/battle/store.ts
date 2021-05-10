import {
    createAction,
    createSlice,

    PayloadAction,

} from '@reduxjs/toolkit';
import { denjuuList } from '../data/denjuu';
import { EffectType, moveList } from '../data/moves';
import { setHpTo } from '../playerDenjuu';
import { store } from '../store';
import { Attack, BattleStart, BattleState, Damage } from './types';


const initBattleState: BattleState = {
    activePlayer: 0,
    battleLog: [],

};
export const battleSlice = createSlice({
    name: 'battle',
    initialState: initBattleState,
    reducers: {
        startBattle: (state, { payload }: PayloadAction<BattleStart>) => {
            state.battleLog = ['time to fight!']
            state.activePlayer = 0
            state.p1 = { status: 'static', ...payload.player }
            state.p2 = { status: 'static', ...payload.enemy }

            return state

        },
        p1Attack: (state, { payload: { moveId } }: PayloadAction<Attack>) => {
            if (!state.p1 || !state.p2) {
                return state
            }


            state.p1.status = 'attack';
            state.p1.activeMoveId = moveId;
            moveList[moveId].effects.forEach((effect) => {
                switch (effect.type) {
                    case EffectType.Damage: {
                        state.p2!.stats.hp = Math.max(0, state.p2!.stats.hp - effect.value!);
                        break;
                    }
                }
            });
            state.p2.status = 'damage';
            state.activePlayer = 1;
            state.battleLog.unshift(
                `${denjuuList[state.p1!.denjuuId - 1].displayId} used ${moveList[moveId].displayId}`
            );

        },
        p2Attack: (state, { payload: { moveId } }: PayloadAction<Attack>) => {
            if (!state.p1 || !state.p2) {
                return state
            }
            state.p2.status = 'attack';
            state.p2.activeMoveId = moveId;
            moveList[moveId].effects.forEach((effect) => {
                switch (effect.type) {
                    case EffectType.Damage: {
                        state.p1!.stats.hp = Math.max(0, state.p1!.stats.hp - effect.value!);
                        break;
                    }
                }
            });
            state.p1.status = 'damage';
            state.activePlayer = 0;
            state.battleLog.unshift(
                `${denjuuList[state.p2.denjuuId - 1].displayId} used ${moveList[moveId].displayId
                }`
            );
        },
        damagetoP1: (state, { payload }: PayloadAction<Damage>) => {
            if (!state.p1 || !state.p2) {
                return state
            }
            state.p1.stats.hp = Math.max(state.p1.stats.hp - payload.damage, 0);
            state.p1.status = 'damage';
            state.p1.activeMoveId = undefined;
        },
        damagetoP2: (state, { payload }: PayloadAction<Damage>) => {
            if (!state.p1 || !state.p2) {
                return state
            }
            state.p2.stats.hp = Math.max(state.p2.stats.hp - payload.damage, 0);
            state.p2.status = 'damage';
            state.p2.activeMoveId = undefined;
        },
    },
});
export const { p1Attack, startBattle } = battleSlice.actions;
