import styled from "@emotion/styled";
import React, { forwardRef, Ref } from 'react';

import { panelSize, pointSize } from "./constants";

const PointBox = styled.div({
    height: panelSize / 3 + 'vw',
    width: panelSize / 3 + 'vw',
    boxSizing: 'border-box',
    touchAction: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
});

const DrawPoint = styled.div(
    ({
        isSelected,
        selectable,
        playerThere,
        attackThere
    }: {
        isSelected: boolean;
        selectable: boolean;
        playerThere: boolean;
        attackThere: boolean
    }) => ({
        height: pointSize + 'px',
        width: pointSize + 'px',

        minHeight: pointSize + 'px',
        minWidth: pointSize + 'px',
        margin: '40px',
        touchAction: 'none',
        backgroundColor: isSelected ? 'red' : selectable ? 'gray' : '#B7B7B7',
        '::before': {
            ...(playerThere && { content: '"🔵"' }),
        },
        ...(attackThere && { border: '1px solid black' })
    })
);

export const GridSection = forwardRef(({
    isSelected,
    selectable,
    playerThere,
    attackThere,

}: {
    isSelected: boolean;
    selectable: boolean;
    playerThere: boolean;
    attackThere: boolean;
    index: number;
}, ref: Ref<HTMLDivElement>) =>

(<PointBox>
    <DrawPoint
        ref={ref}
        isSelected={isSelected}
        selectable={selectable}
        playerThere={playerThere
        }
        attackThere={attackThere}
    />
</PointBox>)
)

GridSection.displayName = 'GridSection'