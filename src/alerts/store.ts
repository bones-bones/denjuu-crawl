import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getNow } from '../common';
import { AlertState, AlertWrapper } from './types';

export const name = 'alerts';
const initialState: AlertState =
    localStorage.getItem('reduxState') &&
    JSON.parse(localStorage.getItem('reduxState')!)[name]
        ? JSON.parse(localStorage.getItem('reduxState')!)[name]
        : {
              lastNotification: 0,
              events: [
                  {
                      id: 0,
                      eventData: {
                          type: 'conversation',
                          instanceId: 'announcements',
                      },
                      updated: new Date(1623003499251).getTime(),
                  },
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

export const alertSlice = createSlice({
    name,
    initialState,
    reducers: {
        newAlert: (
            state,
            { payload }: PayloadAction<AlertWrapper['eventData']>
        ) => {
            state.events.push({
                id: state.events.length,
                updated: getNow(),
                eventData: payload,
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

export const { newAlert, removeEvent } = alertSlice.actions;
