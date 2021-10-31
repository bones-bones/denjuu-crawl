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
    zIndex: 2,
}));

export const GridSection = forwardRef(
    (
        {
            isSelected,
            playerThere,
            attackThere,
        }: {
            isSelected: boolean;
            selectable: boolean;
            playerThere: boolean;
            attackThere: boolean;
        },
        ref: Ref<HTMLDivElement>
    ) => {
        return (
            <PointBox>
                {attackThere && <Attack />}
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
    zIndex: 3,
});
const Attack = styled.div({
    position: 'absolute',
    pointerEvents: 'none',
    height: panelSize / 3 - 2 + 'vw',
    width: panelSize / 3 - 2 + 'vw',
    boxSizing: 'border-box',
    backgroundColor: 'red',
    zIndex: 1,
});
