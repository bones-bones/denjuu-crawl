import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getNow } from '../common';
import { Message } from './types';

const introMessages = [
    `Hello there`,
    ` this is a project that i started because i enjoy bootleg pokemon jade/Telefang, wanted to learn about Single Page Application development, and improve my ts/react/redux skills.`,
    `There's a lot to be done, check out the Walk mode, Alerts menu, Denjuu list, and... the other ones don't work yet...`,
    `If you have suggestions or want to help, check out https://github.com/bones-bones/denjuu-crawl`,
];

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
        : {
            announcements: {
                messages: introMessages.map((entry) => ({
                    type: 'denjuu',
                    text: entry,
                })),
                denjuuId: 0,
                threadTitle: 'Announcements',
            },
        };

export const conversationsSlice = createSlice({
    name,
    initialState,
    reducers: {
        newConversation: (
            state,
            {
                payload: {
                    instanceId,
                    denjuuId,
                    threadTitle,
                    messages,
                    pendingResponses = [],
                },
            }: PayloadAction<{
                instanceId: string;
                denjuuId?: number;
                threadTitle: string;
                messages: Message[];
                pendingResponses?: string[];
            }>
        ) => {
            state[instanceId] = {
                denjuuId,
                threadTitle,
                messages,
                pendingResponses,
            };
        },
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
            state[instanceId].pendingResponses = pendingResponses;
            state[instanceId].messages.push({
                type,
                text,
                sent: getNow(),
            });
        },
        readConversation: (
            state,
            { payload: { instanceId } }: PayloadAction<{ instanceId: string }>
        ) => {
            state[instanceId].lastRead = getNow();
        },
        deleteConversation: (
            // kinda sketchy
            state,
            { payload: { instanceId } }: PayloadAction<{ instanceId: string }>
        ) => {
            delete state[instanceId];
        },
    },
});

export const {
    addMessageToConversation,
    readConversation,
    deleteConversation,
    newConversation,
} = conversationsSlice.actions;
