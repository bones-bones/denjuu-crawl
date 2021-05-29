import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import { newRandomEvent } from '../alerts';
import { MonsterType, randomMonsterType } from '../data';
import { RootState } from '../store';
import { getMapForType } from './spawnMap';
import { AppWalkState, Tile } from './types';

const baseType = randomMonsterType()
const initialState: AppWalkState = localStorage.getItem('reduxState')
    ? JSON.parse(localStorage.getItem('reduxState')!).counter
    : {
        step: {
            value: 0,
            lastUpdatedTime: new Date().getTime(),
            triggerCount: 5,
        },
        location: {
            type: baseType,
            map: getMapForType(baseType)
        }
    }

export const incrementThunk = () => (
    dispatch: Dispatch,
    getState: () => RootState
) => {
    // there is some garbage up here where we preempt the values we'd be changing in the incremented slice
    const { step } = getState().counter;
    const newStepCount = step.value + 1;

    if (newStepCount % 65 === 0) {
        const baseType = randomMonsterType();

        dispatch(
            setNewLocation({
                type: baseType,
                map: getMapForType(baseType),
            })
        );
    }

    if (step.triggerCount == 1) {
        dispatch(newRandomEvent());
    }
    dispatch(incremented());
};

export const counterSlice = createSlice({
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
                state.step.triggerCount = getTriggerCount();
            }
        },
        resetSteps: (state) => ({
            ...state,
            step: {
                value: 0,
                lastUpdatedTime: new Date().getTime(),
                triggerCount: 5,
            },
        }),
        setNewLocation: (
            state,
            {
                payload,
            }: PayloadAction<{
                type: MonsterType;
                map: Array<Tile[]>;
            }>
        ) => {
            state.location = payload;
        },
    },
});

const getTriggerCount = () => {
    return 5;
};
export const { incremented, resetSteps, setNewLocation } = counterSlice.actions;
