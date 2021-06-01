import styled from '@emotion/styled';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BattleApp, startBattleThunk } from '../battle';
import { getDenjuuAtLevel } from '../data';
import { itemList } from '../data/items';
import { addItem } from '../items';
import { Popup } from '../popup';
import { RootState } from '../store';
import { AlertListItem } from './AlertListItem';
import { removeEvent } from './store';
import { AlertWrapper, ItemAlert } from './types';

export const AlertView = () => {
    const stateAlerts = useSelector(
        ({ events: { events } }: RootState) => events
    );

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
                        }
                        // dispatch(removeEvent({ eventId: entry.id }))
                    }}
                />
            ))}
            {activeAlert && (
                <Popup
                    closeCallback={() => {
                        dispatch(removeEvent({ eventId: activeAlert.id }));
                        setActiveEventId(undefined);
                    }}
                >
                    <EventPopupContent activeAlert={activeAlert} />
                </Popup>
            )}
        </PanelDiv>
    );
};

const EventPopupContent = ({ activeAlert }: { activeAlert: AlertWrapper }) => {
    switch (activeAlert.eventData.type) {
        case 'message': {
            return (
                <MessageBackground>
                    {activeAlert.eventData.message || 'no message'}
                </MessageBackground>
            );
        }
        case 'battle': {
            return <BattleApp />;
        }
        case 'item': {
            return (
                <ItemConfirmation activeAlert={activeAlert}></ItemConfirmation>
            );
        }
        default: {
            return <div>unknown event type</div>;
        }
    }
};

const ItemConfirmation = ({
    activeAlert: { eventData },
}: {
    activeAlert: AlertWrapper;
}) => {
    const { image, displayId } = itemList[(eventData as ItemAlert).itemId];
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
    borderRadius: '15px',
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
