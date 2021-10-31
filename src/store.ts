import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { alertSlice, name as alertsName } from './alerts';
import { battleSlice } from './battle';
import { conversationsSlice, name as conversationsName } from './conversation';
import { inventorySlice, name as inventoryName } from './inventory';
import { contactListSlice } from './playerDenjuu';
import { name as settingsName, settingsSlice } from './settings';
import { counterSlice } from './walk';


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

//store.subscribe(handleChange);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

store.subscribe(() => {
    localStorage.setItem('reduxState', JSON.stringify(store.getState()));
});
