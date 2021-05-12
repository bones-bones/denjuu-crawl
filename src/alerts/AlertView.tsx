import styled from '@emotion/styled';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BattleApp, startBattle } from '../battle';
import { denjuuList, getDenjuuAtLevel } from '../data';
import { itemList } from '../data/items';
import { addItem } from '../items';
import { Popup } from '../popup';
import { RootState } from '../store';
import { removeEvent } from './store';
import { Alert, BattleAlert, ItemAlert, MessageAlert } from './types';

export const AlertView = () => {
    const stateAlerts = useSelector(({ events: { events } }: RootState) =>
        events
    );



    const dispatch = useDispatch();
    const [showBattle, setShowBattle] = useState(false);
    const [activeEventId, setActiveEventId] = useState<number | undefined>(undefined);
    const activeAlert = stateAlerts.find(({ id }) => id == activeEventId)



    const playerDenjuu = useSelector(({ contactList }: RootState) => { return contactList.denjuu.find(({ instanceId }) => contactList.activeDenju === instanceId) })!;

    return (
        <PanelDiv>
            {stateAlerts.map((entry) => {
                return <EventListItem
                    onClick={() => {
                        setActiveEventId(entry.id)

                        if (entry.eventData.type == 'battle') {
                            const enemyLevel = entry.eventData.level
                            const enemyDenjuu = getDenjuuAtLevel(entry.eventData.denjuuId, enemyLevel);
                            dispatch(startBattle({
                                player: { stats: { ...playerDenjuu.stats, hp: playerDenjuu.temporalStats.hp }, moves: playerDenjuu.moves, denjuuId: playerDenjuu.denjuuId },
                                enemy: { stats: enemyDenjuu.stats, denjuuId: enemyDenjuu.denjuuId, moves: enemyDenjuu.moves, level: enemyLevel }
                            }))
                            setShowBattle(true);
                        } else if (entry.eventData.type == 'item') {
                            dispatch(addItem({ itemId: entry.eventData.itemId }))
                        }
                        // dispatch(removeEvent({ eventId: entry.id }))
                    }}
                    key={entry.id}
                >
                    <EventIcon />
                    <div>
                        <ListItemTitle>{getEventTitle(entry.eventData)}</ListItemTitle>
                        <br />
                        <ListItemSubTitle>
                            {getEventSubtitle(entry.eventData)}
                        </ListItemSubTitle>
                    </div>
                </EventListItem>
            })
            }
            {activeAlert && <Popup closeCallback={() => {
                dispatch(removeEvent({ eventId: activeAlert.id }))
                setActiveEventId(undefined)
            }}>
                <div>{activeAlert.eventData.type == 'message' ? activeAlert.eventData.message : 'no message'}</div>
            </Popup>}

        </PanelDiv>
    );
};

const AlertMessage = () => { return <></> }

const getEventTitle = (entry: Alert) => {
    switch (entry.type) {
        case 'item': { return "You found an item!" }
        case 'battle': { return "A challenger wants to fight" }
        case 'message': { return 'You\'ve got a message!' }
        default: { return "!!missing title template!!" }
    }
}
const getEventSubtitle = (entry: Alert) => {
    switch (entry.type) {
        case 'item': { return `It's a ${itemList[(entry as ItemAlert).itemId].displayId}` }
        case 'battle': { return `Level: ${(entry as BattleAlert).level} ${denjuuList[(entry as BattleAlert).denjuuId - 1].displayId}` }
        case 'message': { return `"${(entry as MessageAlert).message.substr(0, 60)}...` }
        default: { return "!!missing alert body!!" }
    }
}


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
