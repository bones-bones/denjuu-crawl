import styled from '@emotion/styled';
import React from 'react';

import { Counter } from './Counter';
import { PlayerCanvas } from './PlayerCanvas';
export const StepApp = () => (
    <BackgroundPanel>
        <Counter />
        <PlayerCanvas />
    </BackgroundPanel>
);

const BackgroundPanel = styled.div({
    backgroundColor: 'black',
    height: '90vh',
    maxHeight: '90vh',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
});
