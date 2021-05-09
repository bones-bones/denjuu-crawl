import styled from '@emotion/styled';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { BattleApp } from '../BattleApp';
import { RootState } from '../store';


export const EventView = () => {
    const stateEvents = useSelector(({ events: { events } }: RootState) => { return events })
    const events = stateEvents;
    const [showBattle, setShow] = useState(false);
    return <PanelDiv>
        {!showBattle && events.map(entry => {
            return <EventListItem onClick={() => { setShow(true) }} key={entry.id}><EventIcon />
                <div>
                    <ListItemTitle>Hey look it&rsquo;s</ListItemTitle>
                    <br />
                    <ListItemSubTitle>{entry.message}</ListItemSubTitle>
                </div>
            </EventListItem>;
        })}{showBattle && <BattleApp></BattleApp>}
    </PanelDiv>;
}

const ListItemTitle = styled.span({ 'fontWeight': 'bold' })
const ListItemSubTitle = styled.span({})


const EventIcon = styled.div({ 'height': '7vh', width: '7vh', backgroundColor: 'black', })

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
    alignItems: 'center'
})

const PanelDiv = styled.div({
    backgroundColor: 'darkgray',
    height: '90vh',
    maxHeight: '90vh',

    justifyContent: 'center',
    overflow: 'scroll',
    flexDirection: 'column'
})

