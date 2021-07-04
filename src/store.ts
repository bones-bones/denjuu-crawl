import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { alertSlice, name as alertsName } from './alerts';
import { attackThunk, battleSlice } from './battle';
import { conversationsSlice, name as conversationsName } from './conversation';
import { inventorySlice, name as inventoryName } from './inventory';
import { contactListSlice } from './playerDenjuu';
import { name as settingsName, settingsSlice } from './settings';
import { counterSlice } from './walk';

let activeTurnValue = '1';
let activeTurnCount = 0;
// Move to Hook
function handleChange() {
    activeTurnValue = store.getState().battle.activePlayer;
    const { turnCount } = store.getState().battle;
    if (
        turnCount != activeTurnCount &&
        activeTurnValue === '2' &&
        store.getState().battle.p2?.stats.hp! > 0
    ) {
        activeTurnCount = turnCount;
        setTimeout(() => {
            if (store.getState().battle.winner === undefined) {
                const p2Moves = store.getState().battle.p2!.moves;
                const moveToUse =
                    p2Moves[Math.floor(Math.random() * p2Moves.length)];
                store.dispatch(attackThunk({ player: '2', moveId: moveToUse }));
            }
        }, 1000);
    }
}

export const store = configureStore({
    reducer: combineReducers({
        counter: counterSlice.reducer,
        battle: battleSlice.reducer,
        [alertsName]: alertSlice.reducer,
        contactList: contactListSlice.reducer,
        [inventoryName]: inventorySlice.reducer,
        [conversationsName]: conversationsSlice.reducer,
        [settingsName]: settingsSlice.reducer,
    }),
});

store.subscribe(handleChange);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

store.subscribe(() => {
    localStorage.setItem('reduxState', JSON.stringify(store.getState()));
});
