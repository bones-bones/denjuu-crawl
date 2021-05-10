import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EventState, Event } from './types';

const initialState: EventState = {
    events: [
        { type: 'item', id: 'theId', message: 'this is the message' },
        { type: 'battle', id: '2', message: 'Fight' },
    ],
};

export const eventSlice = createSlice({
    name: 'eventState',
    initialState,
    reducers: {
        newEvent: (state, { payload }: PayloadAction<Event>) => {
            state.events.push(payload);
        },
        removeEvent: (
            state,
            { payload: { eventId } }: PayloadAction<{ eventId: string }>
        ) => {
            const eventIndex = state.events.findIndex(
                (entry) => entry.id === eventId
            );
            state.events = state.events.splice(eventIndex, 1);
        },
    },
});

export const { newEvent, removeEvent } = eventSlice.actions