import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SettingsState {
    vibration: boolean;
    wakeLock: boolean;
}

export const name = 'settings';
const initialState: SettingsState =
    localStorage.getItem('reduxState') &&
    JSON.parse(localStorage.getItem('reduxState')!)[name]
        ? JSON.parse(localStorage.getItem('reduxState')!)[name]
        : {
              vibration: false,
              wakeLock: false,
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
        setWakeLock: (
            state,
            {
                payload: { wakeLockSetting },
            }: PayloadAction<{ wakeLockSetting: boolean }>
        ) => {
            state.wakeLock = wakeLockSetting;
        },
    },
});

export const { setVibration, setWakeLock } = settingsSlice.actions;
