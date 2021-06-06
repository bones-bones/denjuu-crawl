import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Message } from './types';

interface MessageState {
    [instanceId: string]: {
        messages: Message[];
        denjuuId?: number;
        threadTitle: string;
        pendingResponses: string[];
        lastRead?: number;
    };
}
export const name = 'conversations';
const initialState: MessageState =
    localStorage.getItem('reduxState') &&
    JSON.parse(localStorage.getItem('reduxState')!)[name]
        ? JSON.parse(localStorage.getItem('reduxState')!)[name]
        : {};

// export const incrementThunk = () => (
//     dispatch: Dispatch,
//     getState: () => RootState
// ) => {

// };

export const conversationsSlice = createSlice({
    name,
    initialState,
    reducers: {
        addMessageToConversation: (
            state,
            {
                payload: { instanceId, type, text, pendingResponses = [] },
            }: PayloadAction<
                Pick<Message, 'type' | 'text'> & {
                    pendingResponses?: string[];
                    instanceId: string;
                }
            >
        ) => {
            (state[instanceId].pendingResponses = pendingResponses),
                state[instanceId].messages.push({
                    type,
                    text,
                    sent: new Date().getTime(),
                });
        },
        readConversation: (
            state,
            { payload: { instanceId } }: PayloadAction<{ instanceId: string }>
        ) => {
            state[instanceId].lastRead = new Date().getTime();
        },
    },
});

export const {
    addMessageToConversation,
    readConversation,
} = conversationsSlice.actions;
