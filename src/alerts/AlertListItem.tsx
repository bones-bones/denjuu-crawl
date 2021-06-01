import styled from '@emotion/styled';
import React from 'react';

import { denjuuList } from '../data';
import { Alert, AlertWrapper, BattleAlert, MessageAlert } from './types';

export const AlertListItem = ({
    eventData,
    onClick,
}: {
    eventData: AlertWrapper['eventData'];
    onClick: () => void;
}) => {
    return (
        <EventListItem onClick={onClick}>
            <EventIcon>{eventData.type[0].toUpperCase()}</EventIcon>
            <div>
                <ListItemTitle>{getEventTitle(eventData)}</ListItemTitle>
                <br />
                <ListItemSubTitle>
                    {getEventSubtitle(eventData)}
                </ListItemSubTitle>
            </div>
        </EventListItem>
    );
};

const getEventSubtitle = (entry: Alert) => {
    switch (entry.type) {
        case 'item': {
            return ``;
        }
        case 'battle': {
            return `Level: ${(entry as BattleAlert).level} ${
                denjuuList[(entry as BattleAlert).denjuuId].displayId
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
    minHeight: '7vh',
    color: 'white',
    minWidth: '7vh',
    backgroundColor: 'black',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Mate SC',
    fontWeight: 'bold',
    fontSize: '6vh',
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
