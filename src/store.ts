import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { eventSlice } from './alerts';
import { attackThunk, battleSlice } from './battle';
import { inventorySlice } from './items';
import { contactListSlice } from './playerDenjuu';
import { counterSlice } from './walk';

let activeTurnValue = '1';
function handleChange() {
    const previousValue = activeTurnValue;
    activeTurnValue = store.getState().battle.activePlayer;
    if (
        activeTurnValue != previousValue &&
        activeTurnValue === '2' &&
        store.getState().battle.p2?.stats.hp! > 0
    ) {
        setTimeout(() => {
            if (store.getState().battle.winner === undefined) {
                const p2Moves = store.getState().battle.p2!.moves
                const moveToUse = p2Moves[Math.floor(Math.random() * p2Moves.length)]
                store.dispatch(attackThunk({ player: '2', moveId: moveToUse }));
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
