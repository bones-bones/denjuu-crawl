import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';

import { newAlert } from '../alerts';
import { getNow, getRandomElementFromArray } from '../common';
import {
    getMarkovDialogue,
    getSentence,
    Message,
    newConversation,
} from '../conversation';
import { denjuuList, itemList, MonsterType, randomMonsterType } from '../data';
import { healDenjuu } from '../playerDenjuu';
import { RootState } from '../store';
import { getMapForType } from './spawnMap';
import { AppWalkState, Tile } from './types';
const getTriggerCount = () => 30;

const baseType = randomMonsterType();
const initialState: AppWalkState = localStorage.getItem('reduxState')
    ? JSON.parse(localStorage.getItem('reduxState')!).counter
    : {
        step: {
            value: 0,
            lastUpdatedTime: getNow(),
            triggerCount: getTriggerCount(),
        },
        location: {
            type: baseType,
            map: getMapForType(baseType),
        },
    };

export const incrementThunk = () => (
    dispatch: Dispatch,
    getState: () => RootState
) => {
    // there is some garbage up here where we preempt the values we'd be changing in the incremented slice
    const {
        counter: { step, location },
        contactList,
        settings: { vibration },
    } = getState();
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
    if (step.value % 10) {
        dispatch(healDenjuu({ value: 1 }));
    }

    if (step.triggerCount == 1) {
        const eventNumber = Math.floor(Math.random() * 100);
        if (eventNumber <= 7) {
            // dispatch items
            if (navigator.vibrate && vibration) {
                navigator.vibrate(200);
            }
            dispatch(
                newAlert({
                    type: 'item',
                    itemId: Math.floor(Math.random() * itemList.length),
                })
            );
        } else if (eventNumber > 7 && eventNumber <= 35) {
            //dispatch fight
            const possibleDenjuu = denjuuList.filter(
                (entry) => entry.type == location?.type
            );
            const selectedDenjuu = getRandomElementFromArray(possibleDenjuu);
            if (selectedDenjuu) {
                if (navigator.vibrate && vibration) {
                    navigator.vibrate(200);
                }
                dispatch(
                    newAlert({
                        type: 'battle',
                        level:
                            Math.floor(Math.random() * 3) -
                            1 +
                            contactList.denjuu.find(
                                (entry) =>
                                    entry.instanceId == contactList.activeDenju
                            )!.level,
                        denjuuId: selectedDenjuu.id,
                    })
                );
            }
        } else if (eventNumber > 35 && eventNumber <= 60) {
            const convoId = 'nw' + getNow();
            const denjuuId = Math.floor(Math.random() * denjuuList.length);

            getMarkovDialogue();

            const messages: Message[] = [];
            let hasQuestion = false;
            while (!hasQuestion) {
                messages.push({
                    type: 'denjuu',
                    text: getSentence(),
                    sent: getNow(),
                });
                if (messages[messages.length - 1].text.includes('<Q')) {
                    hasQuestion = true;
                }
            }

            const responseSection = messages.pop()!.text;
            messages.push({
                type: 'player',
                text: "How's it going?",
                sent: getNow(),
            });
            const parsed = /(.+) <Q>(.+)<\|>(.+)<\/Q>/.exec(responseSection)!;
            const question = parsed[1];
            const answer1 = parsed[2];
            const answer2 = parsed[3];
            messages.push({ type: 'denjuu', text: question, sent: getNow() });
            dispatch(
                newConversation({
                    instanceId: convoId,
                    denjuuId,
                    threadTitle: denjuuList[denjuuId].displayId,
                    messages,
                    pendingResponses: [answer1, answer2],
                })
            );
            dispatch(
                newAlert({
                    type: 'conversation',
                    instanceId: convoId,
                })
            );
        }
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
            state.step.lastUpdatedTime = getNow();
            state.step.triggerCount--;
            if (state.step.triggerCount <= 0) {
                state.step.triggerCount = getTriggerCount();
            }
        },
        resetSteps: (state) => ({
            ...state,
            step: {
                value: 0,
                lastUpdatedTime: getNow(),
                triggerCount: getTriggerCount(),
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

export const { incremented, resetSteps, setNewLocation } = counterSlice.actions;
