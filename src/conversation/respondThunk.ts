import { getRandomElementFromArray } from '../common';
import { newDenjuu } from '../playerDenjuu';
import { RootState } from '../store';
import { addMessageToConversation } from './store';
import { Message } from './types';

export const respondThunk = (
    body: Pick<Message, 'type' | 'text'> & {
        pendingResponses?: string[];
        instanceId: string;
    }
) => (dispatch: (body: any) => void, getState: () => RootState) => {
    const outcome = Math.floor(Math.random() * 6);
    const successMessages = [
        `Let's hang out!`,
        `Call me soon!`,
        `I think we're gonna be friends`,
    ];
    const failureMessages = [
        `oh...`,
        `so that's how it is`,
        `loose this number`,
    ];
    const neutralMessages = [
        'ttyl!',
        'anyways, i gotta go',
        `nice catching up!`,
        `we'll chat again`,
    ];
    let message = '';

    dispatch(addMessageToConversation(body));

    switch (outcome) {
        case 0: {
            message = getRandomElementFromArray(successMessages);
            setTimeout(() => {
                dispatch(
                    addMessageToConversation({
                        instanceId: body.instanceId,
                        type: 'denjuu',
                        text: message,
                    })
                );
                dispatch(
                    newDenjuu({
                        denjuuId: getState().conversations[body.instanceId]
                            .denjuuId!,
                        level: Math.floor(Math.random() * 8),
                    })
                );
            }, 1500);
            break;
        }
        case 1: {
            message = getRandomElementFromArray(failureMessages);
            setTimeout(() => {
                dispatch(
                    addMessageToConversation({
                        instanceId: body.instanceId,
                        type: 'denjuu',
                        text: message,
                    })
                );
                //   dispatch(deleteConversation({ instanceId: body.instanceId }))
            }, 1500);

            break;
        }
        default: {
            message = getRandomElementFromArray(neutralMessages);
            setTimeout(() => {
                dispatch(
                    addMessageToConversation({
                        instanceId: body.instanceId,
                        type: 'denjuu',
                        text: message,
                    })
                );
            }, 1500);
            break;
        }
    }
};
