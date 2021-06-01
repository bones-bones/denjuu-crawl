import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AlertState, AlertWrapper } from './types';

const introMessage = `Hello there, this is a project that i started because i enjoy bootleg pokemon, wanted to learn about Single Page Application development, and improve my ts/react/redux skills.
There's a lot to be done, check out the Walk mode, Alerts menu, Denjuu list, and... the other ones don't work yet... The repo is publicly available at https://github.com/bones-bones/denjuu-crawl`;

const initialState: AlertState =
    localStorage.getItem('reduxState') &&
        JSON.parse(localStorage.getItem('reduxState')!).events
        ? JSON.parse(localStorage.getItem('reduxState')!).events
        : {
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
        newAlert: (state, { payload }: PayloadAction<AlertWrapper['eventData']>) => {
            state.events.push({
                id: state.events.length,
                eventData: payload
            });
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

export const { newAlert, removeEvent } = eventSlice.actions;
