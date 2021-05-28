import styled from '@emotion/styled';
import React from 'react';

export const BattleLog = ({ battleLog }: { battleLog: string[] }) => {
    return (
        <BattleMessage>
            {battleLog.map((e, i) => (
                <BattleLogMessage key={i}>{e}</BattleLogMessage>
            ))}
        </BattleMessage>
    );
};
const BattleMessage = styled.div({
    height: '9vh',
    backgroundColor: 'white',
    overflowY: 'scroll',
});

const BattleLogMessage = styled.span({ display: 'block', height: '3vh' });
