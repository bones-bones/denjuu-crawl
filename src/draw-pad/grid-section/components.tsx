import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

import { panelSize, pointSize } from '../constants';

export const Player = styled.div({
    backgroundColor: 'blue',
    height: pointSize + 'px',
    width: pointSize + 'px',
    borderRadius: '20px',
    position: 'absolute',
    pointerEvents: 'none',
    zIndex: 6,
});

export const Attack = styled.div(({ time }: { time: number }) => ({
    position: 'absolute',
    pointerEvents: 'none',
    height: panelSize / 3 - 2 + 'vw',
    width: panelSize / 3 - 2 + 'vw',
    boxSizing: 'border-box',
    backgroundColor: 'red',
    zIndex: 1,
    animation: `${fadeIn} ${time / 1000}s linear`,
    opacity: 0,
}));

export const fadeIn = keyframes({
    '95%': {
        opacity: 1,
    },
    '98%': {
        height: panelSize / 3 - 2 + 'vw',
        width: panelSize / 3 - 2 + 'vw',
    },
    '100%': {
        opacity: 1,
        height: panelSize / 3 + 'vw',
        width: panelSize / 3 + 'vw',
    },
});

export const PointBox = styled.div({
    height: panelSize / 3 + 'vw',
    width: panelSize / 3 + 'vw',
    boxSizing: 'border-box',
    touchAction: 'none',
    display: 'flex',
    backgroundColor: 'lightgreen',
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid black',
});

export const DrawPoint = styled.div(
    ({ isSelected }: { isSelected: boolean }) => ({
        height: pointSize + 'px',
        width: pointSize + 'px',
        borderRadius: '20px',
        minHeight: pointSize + 'px',
        minWidth: pointSize + 'px',
        margin: '40px',
        touchAction: 'none',
        backgroundColor: isSelected ? 'orange' : 'gray',
        zIndex: 5,
    })
);
