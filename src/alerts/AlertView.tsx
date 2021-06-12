import styled from '@emotion/styled';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { BattleApp, startBattleThunk } from '../battle';
import { Conversation, readConversation } from '../conversation';
import { getDenjuuAtLevel } from '../data';
import { itemList } from '../data/items';
import { addItem } from '../inventory';
import { BorderedPopup } from '../popup';
import { RootState } from '../store';
import { AlertListItem } from './AlertListItem';
import { removeEvent } from './store';
import { name } from './store';
import { AlertWrapper, ItemAlert } from './types';

export const AlertView = () => {
    const stateAlerts = useSelector(
        ({ [name]: { events } }: RootState) => events
    );
    // const conversations = useSelector(
    //     ({ conversations }: RootState) => conversations
    // );

    const dispatch = useDispatch();
    const [activeEventId, setActiveEventId] = useState<number | undefined>(
        undefined
    );
    const activeAlert = stateAlerts.find(({ id }) => id == activeEventId);

    return (
        <PanelDiv>
            {stateAlerts.map((entry) => (
                <AlertListItem
                    key={entry.id}
                    eventData={entry.eventData}
                    onClick={() => {
                        setActiveEventId(entry.id);
                        if (entry.eventData.type == 'battle') {
                            const enemyLevel = entry.eventData.level;
                            const enemyDenjuu = getDenjuuAtLevel(
                                entry.eventData.denjuuId,
                                enemyLevel
                            );
                            dispatch(
                                startBattleThunk({
                                    instanceId: '' + new Date(),
                                    stats: enemyDenjuu.stats,
                                    temporalStats: enemyDenjuu.stats,
                                    denjuuId: enemyDenjuu.denjuuId,
                                    moves: enemyDenjuu.moves,
                                    level: enemyLevel,
                                })
                            );
                        } else if (entry.eventData.type == 'item') {
                            dispatch(
                                addItem({ itemId: entry.eventData.itemId })
                            );
                        } else if (entry.eventData.type == 'conversation') {
                            dispatch(
                                readConversation({
                                    instanceId: entry.eventData.instanceId,
                                })
                            );
                        }
                        // dispatch(removeEvent({ eventId: entry.id }))
                    }}
                />
            ))}
            {activeAlert && (
                <BorderedPopup
                    closeCallback={() => {
                        dispatch(removeEvent({ eventId: activeAlert.id }));
                        setActiveEventId(undefined);
                    }}
                >
                    <EventPopupContent activeAlert={activeAlert} />
                </BorderedPopup>
            )}
        </PanelDiv>
    );
};

const EventPopupContent = ({
    activeAlert: { eventData },
}: {
    activeAlert: AlertWrapper;
}) => {
    switch (eventData.type) {
        case 'message': {
            return (
                <MessageBackground>
                    {eventData.message || 'no message'}
                </MessageBackground>
            );
        }
        case 'conversation': {
            return <Conversation instanceId={eventData.instanceId} />;
        }
        case 'battle': {
            return <BattleApp />;
        }
        case 'item': {
            return <ItemConfirmation eventData={eventData}></ItemConfirmation>;
        }
        default: {
            return <div>unknown event type</div>;
        }
    }
};

const ItemConfirmation = ({
    eventData: { itemId },
}: {
    eventData: ItemAlert;
}) => {
    const { image, displayId } = itemList[itemId];
    return (
        <MessageBackground>
            <ImageHolder src={image} />
            {`It's a ${displayId}`}
        </MessageBackground>
    );
};
const ImageHolder = styled.img({ imageRendering: 'pixelated' });

const MessageBackground = styled.div({
    backgroundColor: 'white',
    width: '85vw',
    padding: '20px',
});

const PanelDiv = styled.div({
    backgroundColor: 'darkgray',
    height: '90vh',
    maxHeight: '90vh',
    justifyContent: 'center',
    overflow: 'scroll',
    flexDirection: 'column',
});
