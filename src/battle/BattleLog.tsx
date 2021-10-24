import styled from '@emotion/styled';
import React from 'react';

export const BattleLog = ({ battleLog }: { battleLog: string[] }) => (
    <BattleMessage>
        {battleLog.map((e, i) => (
            <BattleLogMessage key={i}>{e}</BattleLogMessage>
        ))}
    </BattleMessage>
);

const BattleMessage = styled.div({
    height: '9vh',
    backgroundColor: 'white',
    overflowY: 'scroll',
    paddingLeft: '1vw',
    paddingRight: '1vw',
    border: '2px solid grey',
    fontFamily: 'M5x7',
    fontSize: '25px',
});

const BattleLogMessage = styled.span({ display: 'block', height: '3vh' });
