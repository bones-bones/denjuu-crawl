import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { eventSlice } from './alerts';
import { contactListSlice } from './playerDenjuu';
import { attackThunk, battleSlice } from './battle';
import { inventorySlice } from './items';
import { counterSlice } from './walk';

let activeTurnValue = 0;
function handleChange() {
    const previousValue = activeTurnValue;
    activeTurnValue = store.getState().battle.activePlayer;
    if (
        activeTurnValue != previousValue &&
        activeTurnValue === 1 &&
        store.getState().battle.p2?.stats.hp! > 0
    ) {
        setTimeout(() => {
            if (store.getState().battle.winner === undefined) {
                store.dispatch(attackThunk({ player: '2', moveId: 1 }));
                // store.dispatch(battleSlice.actions.p2Attack({ moveId: 1 }));
            }
        }, 1000);
    }
}

export const store = configureStore({
    reducer: combineReducers({
        counter: counterSlice.reducer,
        battle: battleSlice.reducer,
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
