import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import React from 'react';

import { panelSize, pointSize } from "./constants";

export const DrawnLines = ({ selectedDots, draggon, points, mousePos }: { selectedDots: number[], draggon: boolean, points: React.RefObject<HTMLDivElement>[], mousePos: { x: number, y: number } }) => {

    return <MySVG>
        {selectedDots.slice(1).map((entry, index) => {
            const { offsetLeft: x1, offsetTop: y1 } = points[
                selectedDots[index]
            ].current!;
            const { offsetLeft: x2, offsetTop: y2 } = points[
                selectedDots[index + 1]
            ].current!;

            return (
                <DrawLine
                    key={entry}
                    x1={x1 + pointSize / 2}
                    y1={y1 + pointSize / 2}
                    x2={x2 + pointSize / 2}
                    y2={y2 + pointSize / 2}
                />
            );
        })}
        {selectedDots.length > 0 && draggon && (
            <DrawLine
                key={'mouse'}
                x1={
                    points[selectedDots[selectedDots.length - 1]]
                        .current!.offsetLeft +
                    pointSize / 2
                }
                y1={
                    points[selectedDots[selectedDots.length - 1]]
                        .current!.offsetTop +
                    pointSize / 2
                }
                x2={mousePos.x}
                y2={mousePos.y}
            />
        )}
    </MySVG>
}
const dash = keyframes({
    to: {
        strokeDashoffset: -1000,
    },
});


const MySVG = styled.svg({
    position: 'absolute',
    width: panelSize + 'vw',
    height: panelSize + 'vw',
    touchAction: 'none',
});
const DrawLine = styled.line({
    stroke: 'black',
    strokeWidth: '6px',
    strokeDasharray: 100,
    animation: dash + ' 3s linear infinite',
});

