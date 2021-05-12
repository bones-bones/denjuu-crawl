import {

    createSlice,

    PayloadAction,

} from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { denjuuList } from '../data/denjuu';
import { EffectType, moveList } from '../data/moves';
import { addItem } from '../items';
import { setHpTo } from '../playerDenjuu';
import { RootState, store } from '../store';
import { Attack, BattleStart, BattleState } from './types';


const initBattleState: BattleState = {
    activePlayer: 0,
    battleLog: [],

};


// export const attackThunk = (att: Attack) => (
//     dispatch: any,
//     getState: any
// ) => {
//     dispatch(p1Attack({ moveId: 0 }))
//     const num = (getState() as RootState).battle.p1?.stats.hp
//     if (num == 0) {
//         dispatch(addItem({ itemId: 1 }));
//     }
// }

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
            state.battleLog.unshift(`${denjuuList[state.p1!.denjuuId - 1].displayId} used ${moveList[moveId].displayId}`
            );

            // if (state.p2.stats.hp === 0) {
            //     requestAnimationFrame(() => {
            //         store.dispatch(setHpTo({ instanceId: '1oshe', hp: 0 }))
            //     })
            // }
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
    },
});
export const { p1Attack, startBattle } = battleSlice.actions;
