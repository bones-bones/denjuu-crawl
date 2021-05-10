import styled from '@emotion/styled';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BattleApp, startBattle } from '../battle';
import { getDenjuuAtLevel } from '../data';
import { RootState } from '../store';
import { removeEvent } from './store';

export const AlertView = () => {
    const stateAlerts = useSelector(({ events: { events } }: RootState) => {
        return events;
    });


    const dispatch = useDispatch();
    const [showBattle, setShow] = useState(false);

    //this is here because i'm lazy
    const playerDenjuu = useSelector(({ contactList }: RootState) => { return contactList.denjuu.find(({ instanceId }) => contactList.activeDenju === instanceId) })!;


    return (
        <PanelDiv>
            {!showBattle &&
                stateAlerts.map((entry) => {

                    return <EventListItem
                        onClick={() => {
                            const enemyLevel = 3
                            const enemyDenjuu = getDenjuuAtLevel(2, enemyLevel);
                            dispatch(startBattle({
                                player: { stats: playerDenjuu.stats, moves: playerDenjuu.moves, denjuuId: playerDenjuu.denjuuId },
                                enemy: { stats: enemyDenjuu.stats, denjuuId: enemyDenjuu.denjuuId, moves: enemyDenjuu.moves, level: enemyLevel }
                            }))
                            dispatch(removeEvent({ eventId: entry.id }))
                            setShow(true);

                        }}
                        key={entry.id}
                    >
                        <EventIcon />
                        <div>
                            <ListItemTitle>Hey look it&rsquo;s</ListItemTitle>
                            <br />
                            <ListItemSubTitle>
                                {entry.message}
                            </ListItemSubTitle>
                        </div>
                    </EventListItem>
                })
            }
            {showBattle && <BattleApp></BattleApp>}
        </PanelDiv>
    );
};

const ListItemTitle = styled.span({ fontWeight: 'bold' });
const ListItemSubTitle = styled.span({});

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
