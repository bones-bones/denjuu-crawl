import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { randomEventGenerator } from './randomEventGenerator';
import { AlertState, AlertWrapper } from './types';

const introMessage = `Hello there, this is a project that i started because i enjoy bootleg pokemon, wanted to learn about SPA development, and improve my ts/react/redux skills.
There's a lot to be done, check out the Walk mode, Alerts menu, Denjuu list, and... the other ones don't work yet... The repo is publicly available at https://github.com/bones-bones/denjuu-crawl`;

const initialState: AlertState = {
    lastNotification: 0,
    events: [
        { id: 0, eventData: { type: 'message', message: introMessage } },
        {
            id: 1,
            eventData: {
                type: 'battle',
                level: Math.floor(Math.random() * 3) + 1,
                denjuuId: 1,
            },
        },
    ],
};

export const eventSlice = createSlice({
    name: 'eventState',
    initialState,

    reducers: {
        newEvent: (state, { payload }: PayloadAction<AlertWrapper>) => {
            state.events.push(payload);
        },
        newRandomEvent: (state) => {
            const eventData = randomEventGenerator();

            const eventNumber = Math.floor(Math.random() * 5);
            if (eventData) {
                if (eventNumber == 3) {
                    state.events.push({ id: state.events.length, eventData });
                }
            }
        },
        removeEvent: (
            state,
            { payload: { eventId } }: PayloadAction<{ eventId: number }>
        ) => {
            const eventIndex = state.events.findIndex(
                (entry) => entry.id === eventId
            );
            state.events.splice(eventIndex, 1);
        },
    },
});

export const { newEvent, removeEvent, newRandomEvent } = eventSlice.actions;
