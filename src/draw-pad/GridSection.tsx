import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import React, { forwardRef, Ref } from 'react';

import { panelSize, pointSize } from './constants';

const PointBox = styled.div({
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

const DrawPoint = styled.div(({ isSelected }: { isSelected: boolean }) => ({
    height: pointSize + 'px',
    width: pointSize + 'px',
    borderRadius: '20px',
    minHeight: pointSize + 'px',
    minWidth: pointSize + 'px',
    margin: '40px',
    touchAction: 'none',
    backgroundColor: isSelected ? 'orange' : 'gray',
    zIndex: 5,
}));

export const GridSection = forwardRef(
    (
        {
            isSelected,
            playerThere,
            incomingAttacks,
        }: {
            isSelected: boolean;
            selectable: boolean;
            playerThere: boolean;
            incomingAttacks: { time: number }[];
        },
        ref: Ref<HTMLDivElement>
    ) => {
        return (
            <PointBox>
                {incomingAttacks.sort(({ time: timeA }, { time: timeB }) => timeA - timeB).map((entry, index) => (<Attack key={index} time={entry.time} />))}
                {playerThere && <Player />}
                <DrawPoint ref={ref} isSelected={isSelected}></DrawPoint>
            </PointBox>
        );
    }
);

GridSection.displayName = 'GridSection';

const Player = styled.div({
    backgroundColor: 'blue',
    height: pointSize + 'px',
    width: pointSize + 'px',
    borderRadius: '20px',
    position: 'absolute',
    pointerEvents: 'none',
    zIndex: 6,
});

const Attack = styled.div(({ time }: { time: number }) => ({
    position: 'absolute',
    pointerEvents: 'none',
    height: panelSize / 3 - 2 + 'vw',
    width: panelSize / 3 - 2 + 'vw',
    boxSizing: 'border-box',
    backgroundColor: 'red',
    zIndex: 1,
    animation: `${fadeIn} ${time / 1000}s linear`,
    opacity: 0

}));

const fadeIn = keyframes({
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