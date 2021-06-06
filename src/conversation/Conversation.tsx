import styled from '@emotion/styled';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { denjuuList, Sprites } from '../data';
import { RootState } from '../store';
import { addMessageToConversation } from './store';

export const Conversation = ({ instanceId }: { instanceId: string }) => {
    const conversation = useSelector(
        ({ conversations }: RootState) => conversations[instanceId]
    );

    const dispatch = useDispatch();
    let sprites: Sprites | undefined = undefined;
    if (conversation.denjuuId) {
        sprites = denjuuList[conversation.denjuuId].sprites!;
    }

    const threadRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (threadRef.current) {
            threadRef.current.scrollTop =
                threadRef.current?.scrollHeight -
                threadRef.current?.clientHeight;
        }
    }, [conversation.messages]);

    return (
        <ConversationBackground>
            <Header>
                <Profile>
                    {sprites && <img src={sprites.normal.front} />}
                    <span>{conversation.threadTitle}</span>
                </Profile>
            </Header>
            <Thread ref={threadRef}>
                {conversation.messages.map((entry, i) => {
                    if (entry.type == 'player') {
                        return (
                            <PlayerMessageBox>{entry.text}</PlayerMessageBox>
                        );
                    } else {
                        return (
                            <DenjuuMessageBox key={i}>
                                {entry.text}
                            </DenjuuMessageBox>
                        );
                    }
                })}
            </Thread>
            <ReplySection>
                {conversation.pendingResponses
                    ? conversation.pendingResponses.map((entry, index) => (
                          <ReplyButton
                              key={index}
                              onClick={() => {
                                  dispatch(
                                      addMessageToConversation({
                                          type: 'player',
                                          text: entry,
                                          instanceId,
                                      })
                                  );
                              }}
                          >
                              {entry}
                          </ReplyButton>
                      ))
                    : '...'}
            </ReplySection>
        </ConversationBackground>
    );
};

const Profile = styled.div({
    display: 'flex',
    alignItems: 'center',
    fontSize: '20px',
    height: '100%',
});

const PlayerMessage = styled.div({
    maxWidth: '70vw',
    display: 'flex',
    backgroundColor: 'white',
    marginTop: '1vh',
    marginBottom: '1vh',
    marginRight: '2vw',
    borderRight: '3px solid red',
    padding: '3px',
});

const DenjuuMessage = styled.div({
    maxWidth: '70vw',
    display: 'flex',
    backgroundColor: 'white',
    marginTop: '1vh',
    marginBottom: '1vh',
    marginLeft: '2vw',
    borderLeft: '3px solid green',
    padding: '3px',
});

const PlayerMessageBox: React.FC = ({ children }) => (
    <MessageAligner isRight={false}>
        <PlayerMessage>{children}</PlayerMessage>
    </MessageAligner>
);

const DenjuuMessageBox: React.FC = ({ children }) => (
    <MessageAligner isRight={true}>
        <DenjuuMessage>{children}</DenjuuMessage>
    </MessageAligner>
);

const Thread = styled.div({
    height: '56vh',
    backgroundColor: '#FAFAFA',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'scroll',
});
const Header = styled.div({
    height: '10vh',
    backgroundColor: 'green',
});

const MessageAligner = styled.div(({ isRight }: { isRight: boolean }) => ({
    display: 'flex',
    justifyContent: isRight ? 'flex-start' : 'flex-end',
}));

const ReplySection = styled.div({
    height: '14vh',
    borderTop: '1px solid black',
    overflow: 'scroll',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
});
const ReplyButton = styled.button({
    width: '70vw',
    borderRadius: '5px',
    border: '2px solid red',
    padding: '5px',
    backgroundColor: 'white',
    ':active': { backgroundColor: 'lightgrey', borderColor: 'darkred' },
});

const ConversationBackground = styled.div({
    backgroundColor: 'white',
    borderRadius: '15px',
    width: '85vw',
    height: '80vh',
    padding: '20px',
});
