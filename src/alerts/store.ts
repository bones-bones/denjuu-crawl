import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { EventState, Event, EventWrapper } from './types';

const initialState: EventState = {
    lastNotification: 0,
    events: [
        { id: 0, eventData: { type: 'message', 'message': "hello there," } },

    ],
};

export const eventSlice = createSlice({
    name: 'eventState',
    initialState,

    reducers: {
        newEvent: (state, { payload }: PayloadAction<EventWrapper>) => {
            state.events.push(payload);
        },
        newRandomEvent: (state) => { state.events.push({ id: state.events.length, 'eventData': { type: 'message', "message": 'less errors' } }) },
        removeEvent: (
            state,
            { payload: { eventId } }: PayloadAction<{ eventId: number }>
        ) => {
            const eventIndex = state.events.findIndex(
                (entry) => entry.id === eventId
            );
            state.events = state.events.splice(eventIndex, 1);
        },
    },
});

export const { newEvent, removeEvent, newRandomEvent } = eventSlice.actions



const introMessage = `Hello there, this is a project that i started because i enjoy bootleg pokemon, wanted to learn about SPA development, and improve my ts/react/redux skills.
There's a lot to be done, check out the Walk mode, Alerts menu, Denjuu list, and... the other ones don't work yet... The repo is publicly available at `