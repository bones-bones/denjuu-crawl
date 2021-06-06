import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SettingsState {
    vibration: boolean;
}

export const name = 'settings';
const initialState: SettingsState =
    localStorage.getItem('reduxState') &&
    JSON.parse(localStorage.getItem('reduxState')!)[name]
        ? JSON.parse(localStorage.getItem('reduxState')!)[name]
        : {
              vibration: false,
          };

export const settingsSlice = createSlice({
    name,
    initialState,
    reducers: {
        setVibration: (
            state,
            {
                payload: { vibrationSetting },
            }: PayloadAction<{ vibrationSetting: boolean }>
        ) => {
            state.vibration = vibrationSetting;
        },
    },
});

export const { setVibration } = settingsSlice.actions;
