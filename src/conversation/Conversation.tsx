import styled from '@emotion/styled';
import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import { denjuuList } from '../data';
import { RootState } from '../store';
import { getMarkovDialogue, getSentence } from './markov';

getMarkovDialogue();
interface Message {
    type: 'player' | 'denjuu';
    text: string;
}
//const messages = [{ type: 'denjuu', text: getSentence() }, { type: 'denjuu', text: getSentence() }, { type: 'player', text: getSentence() }]
const messages: Message[] = [];
let hasQuestion = false;
while (!hasQuestion) {
    messages.push({ type: 'denjuu', text: getSentence() });
    if (messages[messages.length - 1].text.includes('<Q')) {
        hasQuestion = true;
    }
}

const responseSection = messages.pop()!.text;
messages.push({ type: 'player', text: "How's it going?" });
const parsed = /(.+) <Q>(.+)<\|>(.+)<\/Q>/.exec(responseSection)!;
const question = parsed[1];
const answer1 = parsed[2];
const answer2 = parsed[3];
messages.push({ type: 'denjuu', text: question });

export const Conversation = () => {
    const {
        activeDenju,
        denjuu,
    } = useSelector(({ contactList: { activeDenju, denjuu } }: RootState) => ({
        activeDenju,
        denjuu,
    }));
    const sprites = denjuuList[
        denjuu.find((entry) => entry.instanceId === activeDenju)!.denjuuId
    ].sprites!;
    const threadRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (threadRef.current) {
            threadRef.current.scrollTop =
                threadRef.current?.scrollHeight -
                threadRef.current?.clientHeight;
        }
    }, []);

    return (
        <ConversationBackground>
            <Header>
                <Profile>
                    <img src={sprites.normal.front} />
                    <span>
                        {
                            denjuuList[
                                denjuu.find(
                                    (entry) => entry.instanceId === activeDenju
                                )!.denjuuId
                            ].displayId
                        }
                    </span>
                </Profile>
            </Header>
            <Thread ref={threadRef}>
                {messages.map((entry, i) => {
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
                <ReplyButton>{answer1}</ReplyButton>
                <ReplyButton>{answer2}</ReplyButton>
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
