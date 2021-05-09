import {
    createSlice,
    configureStore,
    PayloadAction,
    combineReducers,
} from '@reduxjs/toolkit';
import { denjuuList } from './data/denjuu';
import { EffectType, moveList } from './data/moves';
import { eventSlice } from './alerts';
import { contactListSlice } from './playerDenjuu';

export type AppWalkState = {
    step: {
        value: number;
        lastUpdated: number;
    };
};
const initialState: AppWalkState = localStorage.getItem('reduxState')
    ? JSON.parse(localStorage.getItem('reduxState')!).counter
    : {
          step: {
              value: 0,
              lastUpdated: new Date().getTime(),
          },
      };

const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        incremented: (state) => {
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.step.value += 1;
            state.step.lastUpdated = new Date().getTime();
        },
    },
});

interface Attack {
    moveId: number;
}
interface Damage {
    damage: number;
}

interface BattleState {
    p1: BattleMonster;
    p2: BattleMonster;
    activePlayer: number;
    battleLog: string[];
}

interface BattleMonster {
    status: 'attack' | 'damage' | 'static';
    hp: number;

    denjuuId: number;
    moveId?: number;
}
const initBattleState: BattleState = {
    activePlayer: 0,
    battleLog: ['time to duel'],
    p1: {
        status: 'static',
        hp: 40,
        denjuuId: 0,
    },
    p2: {
        status: 'static',
        hp: 40,
        denjuuId: 1,
    },
};

let activeTurnValue = 0;
function handleChange() {
    const previousValue = activeTurnValue;
    activeTurnValue = store.getState().battle.activePlayer;
    if (activeTurnValue != previousValue && activeTurnValue === 1) {
        setTimeout(() => {
            store.dispatch(battleSlice.actions.p2Attack({ moveId: 1 }));
        }, 1000);
    }
}

interface AppState {
    activeFunction: 'walk' | 'fight';
}
const initAppState: AppState = { activeFunction: 'walk' };

const applicationSlice = createSlice({
    name: 'applicationState',
    initialState: initAppState,
    reducers: {
        startWalking: (state) => {
            state.activeFunction = 'walk';
        },
        startFighting: (state) => {
            state.activeFunction = 'fight';
        },
    },
});

const battleSlice = createSlice({
    name: 'battle',
    initialState: initBattleState,
    reducers: {
        p1Attack: (state, { payload: { moveId } }: PayloadAction<Attack>) => {
            state.p1.status = 'attack';
            state.p1.moveId = moveId;
            moveList[moveId].effects.forEach((effect) => {
                switch (effect.type) {
                    case EffectType.Damage: {
                        state.p2.hp -= effect.value!;
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
            state.p2.status = 'attack';
            state.p2.moveId = moveId;
            moveList[moveId].effects.forEach((effect) => {
                switch (effect.type) {
                    case EffectType.Damage: {
                        state.p1.hp -= effect.value!;
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
        damagetoP1: (state, { payload }: PayloadAction<Damage>) => {
            state.p1.hp = state.p1.hp - payload.damage;
            state.p1.status = 'damage';
            state.p1.moveId = undefined;
        },
        damagetoP2: (state, { payload }: PayloadAction<Damage>) => {
            state.p2.hp = state.p2.hp - payload.damage;
            state.p2.status = 'damage';
            state.p2.moveId = undefined;
        },
    },
});

export const { startFighting, startWalking } = applicationSlice.actions;
export const { incremented } = counterSlice.actions;
export const { damagetoP1, damagetoP2, p1Attack } = battleSlice.actions;

export const store = configureStore({
    reducer: combineReducers({
        counter: counterSlice.reducer,
        battle: battleSlice.reducer,
        pplication: applicationSlice.reducer,
        events: eventSlice.reducer,
        contactList: contactListSlice.reducer,
    }),
});
store.subscribe(handleChange);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

store.subscribe(() => {
    localStorage.setItem('reduxState', JSON.stringify(store.getState()));
});
