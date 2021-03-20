import { createSlice, configureStore } from '@reduxjs/toolkit';

export type AppState = {
    step: {
        value: number;
        lastUpdated: number;
    };
};
const initialState: AppState = {
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
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.step.value += 1;
            state.step.lastUpdated = new Date().getTime();
        },
    },
});

export const { incremented } = counterSlice.actions;

export const store = configureStore({
    reducer: counterSlice.reducer,
});
