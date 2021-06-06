import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getNow } from '../common';
import { getMarkovDialogue, getSentence } from './markov';
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
getMarkovDialogue();

const messages: Message[] = [];
let hasQuestion = false;
while (!hasQuestion) {
    messages.push({ type: 'denjuu', text: getSentence(), sent: getNow() });
    if (messages[messages.length - 1].text.includes('<Q')) {
        hasQuestion = true;
    }
}

const responseSection = messages.pop()!.text;
messages.push({ type: 'player', text: "How's it going?", sent: getNow() });
const parsed = /(.+) <Q>(.+)<\|>(.+)<\/Q>/.exec(responseSection)!;
const question = parsed[1];
// const answer1 = parsed[2];
// const answer2 = parsed[3];
messages.push({ type: 'denjuu', text: question, sent: getNow() });

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
    },
});

export const {
    addMessageToConversation,
    readConversation,
} = conversationsSlice.actions;
