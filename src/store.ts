import { createSlice, configureStore, combineReducers } from '@reduxjs/toolkit';
import { eventSlice, newRandomEvent } from './alerts';
import { contactListSlice } from './playerDenjuu';
import { battleSlice } from './battle';
import { inventorySlice } from './items';

export type AppWalkState = {
    step: {
        value: number;
        lastUpdatedTime: number;
        triggerCount: number;
    };
};
const initialState: AppWalkState = localStorage.getItem('reduxState')
    ? JSON.parse(localStorage.getItem('reduxState')!).counter
    : {
          step: {
              value: 0,
              lastUpdatedTime: new Date().getTime(),
              triggerCount: 5,
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
            state.step.lastUpdatedTime = new Date().getTime();
            state.step.triggerCount--;
            if (state.step.triggerCount <= 0) {
                requestAnimationFrame(() => {
                    store.dispatch(newRandomEvent());
                });
                state.step.triggerCount = getTriggerCount();
            }
        },
        resetSteps: () => ({
            step: {
                value: 0,
                lastUpdatedTime: new Date().getTime(),
                triggerCount: 5,
            },
        }),
    },
});

const getTriggerCount = () => {
    return 5;
};

let activeTurnValue = 0;
function handleChange() {
    const previousValue = activeTurnValue;
    activeTurnValue = store.getState().battle.activePlayer;
    if (
        activeTurnValue != previousValue &&
        activeTurnValue === 1 &&
        store.getState().battle.p2?.stats.hp! > 0 &&
        store.getState().battle.winner !== undefined
    ) {
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

export const { startFighting, startWalking } = applicationSlice.actions;
export const { incremented, resetSteps } = counterSlice.actions;

export const store = configureStore({
    reducer: combineReducers({
        counter: counterSlice.reducer,
        battle: battleSlice.reducer,
        application: applicationSlice.reducer,
        events: eventSlice.reducer,
        contactList: contactListSlice.reducer,
        inventory: inventorySlice.reducer,
    }),
});
store.subscribe(handleChange);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

store.subscribe(() => {
    localStorage.setItem('reduxState', JSON.stringify(store.getState()));
});
