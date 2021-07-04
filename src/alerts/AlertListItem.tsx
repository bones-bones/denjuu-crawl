import styled from '@emotion/styled';
import React from 'react';
import { useSelector } from 'react-redux';

import { BorderedContainer } from '../components';
import { denjuuList } from '../data';
import { RootState } from '../store';
import {
    Alert,
    AlertWrapper,
    BattleAlert,
    ConversationAlert,
    MessageAlert,
} from './types';

export const AlertListItem = ({
    eventData,
    onClick,
}: {
    eventData: AlertWrapper['eventData'];
    onClick: () => void;
}) => {
    return (
        <Container>
            <BorderedContainer>
                <EventListItem onClick={onClick}>
                    <EventIcon>{eventData.type[0].toUpperCase()}</EventIcon>
                    <div>
                        <ListItemTitle>
                            {getEventTitle(eventData)}
                        </ListItemTitle>
                        <br />
                        <ListItemSubTitle>
                            {getEventSubtitle(eventData)}
                        </ListItemSubTitle>
                    </div>
                </EventListItem>
            </BorderedContainer>
        </Container>
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
        case 'conversation': {
            const conversations = useSelector((state: RootState) => {
                return state.conversations;
            });
            const convo =
                conversations[(entry as ConversationAlert).instanceId];
            return (
                convo?.messages[convo?.messages.length - 1]?.text.substr(
                    0,
                    25
                ) + '...'
            );
        }
        default: {
            return '!!missing alert body!!';
        }
    }
};

const ListItemTitle = styled.span({ fontWeight: 'bold' });
const ListItemSubTitle = styled.span({ overflow: 'hidden', lineClamp: 1 });
const Container = styled.div({
    width: '90vw',
    maxWidth: '90vw',

    marginLeft: '5vw',
    marginRight: '5vw',
    marginTop: '2vh',
});
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
    width: '100%',
    // border: '1px solid black',
    border: '0px',
    height: '8vh',
    minHeight: '8vh',
    position: 'relative',
    display: 'flex',
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
        case 'conversation': {
            const conversations = useSelector((state: RootState) => {
                return state.conversations;
            });
            const convo =
                conversations[(entry as ConversationAlert).instanceId];
            return convo?.threadTitle;
        }
        default: {
            return '!!missing title template!!';
        }
    }
};
