import styled from '@emotion/styled';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BattleApp, startBattleThunk } from '../battle';
import { denjuuList, getDenjuuAtLevel } from '../data';
import { itemList } from '../data/items';
import { addItem } from '../items';
import { Popup } from '../popup';
import { RootState } from '../store';
import { removeEvent } from './store';
import {
    Alert,
    AlertWrapper,
    BattleAlert,
    ItemAlert,
    MessageAlert,
} from './types';

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
                <EventListItem
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
                    key={entry.id}
                >
                    <EventIcon />
                    <div>
                        <ListItemTitle>
                            {getEventTitle(entry.eventData)}
                        </ListItemTitle>
                        <br />
                        <ListItemSubTitle>
                            {getEventSubtitle(entry.eventData)}
                        </ListItemSubTitle>
                    </div>
                </EventListItem>
            ))}
            {activeAlert && (
                <Popup
                    closeCallback={() => {
                        dispatch(removeEvent({ eventId: activeAlert.id }));
                        setActiveEventId(undefined);
                    }}
                >
                    {getEventPopupContent(activeAlert)}
                </Popup>
            )}
        </PanelDiv>
    );
};

const getEventPopupContent = (activeAlert: AlertWrapper) => {
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
    }
};

const ItemConfirmation = ({ activeAlert }: { activeAlert: AlertWrapper }) => {
    return (
        <MessageBackground>
            {' '}
            <img
                src={
                    itemList[(activeAlert.eventData as ItemAlert).itemId].image
                }
            />
            you got an item!
        </MessageBackground>
    );
};

const MessageBackground = styled.div({
    backgroundColor: 'white',
    borderRadius: '15px',
});

const getEventTitle = (entry: Alert) => {
    switch (entry.type) {
        case 'item': {
            return 'You found an item!';
        }
        case 'battle': {
            return 'A challenger wants to fight';
        }
        case 'message': {
            return "You've got a message!";
        }
        default: {
            return '!!missing title template!!';
        }
    }
};
const getEventSubtitle = (entry: Alert) => {
    switch (entry.type) {
        case 'item': {
            return `It's a ${itemList[(entry as ItemAlert).itemId].displayId}`;
        }
        case 'battle': {
            return `Level: ${(entry as BattleAlert).level} ${
                denjuuList[(entry as BattleAlert).denjuuId - 1].displayId
            }`;
        }
        case 'message': {
            return `"${(entry as MessageAlert).message.substr(0, 60)}...`;
        }
        default: {
            return '!!missing alert body!!';
        }
    }
};

const ListItemTitle = styled.span({ fontWeight: 'bold' });
const ListItemSubTitle = styled.span({ overflow: 'hidden', lineClamp: 1 });

const EventIcon = styled.div({
    height: '7vh',
    width: '7vh',
    backgroundColor: 'black',
});

const EventListItem = styled.button({
    width: '90vw',
    height: '10vh',
    minHeight: '10vh',
    // border: '1px solid black',
    position: 'relative',
    display: 'flex',
    marginLeft: '5vw',
    marginRight: '5vw',
    marginTop: '2vh',
    justifyContent: 'left',
    alignItems: 'center',
});

const PanelDiv = styled.div({
    backgroundColor: 'darkgray',
    height: '90vh',
    maxHeight: '90vh',
    justifyContent: 'center',
    overflow: 'scroll',
    flexDirection: 'column',
});
