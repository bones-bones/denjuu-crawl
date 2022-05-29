import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';

import { panelSize, pointSize } from './constants';

export const DrawnLines = ({
    selectedDots,
    dragging,
    points,
    mousePos,
}: {
    selectedDots: number[];
    dragging: boolean;
    points: React.RefObject<HTMLDivElement>[];
    mousePos: { x: number; y: number };
}) => {
    const scalePointSize = pointSize / 2;

    return (
        <MySVG>
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
                        x1={x1 + scalePointSize}
                        y1={y1 + scalePointSize}
                        x2={x2 + scalePointSize}
                        y2={y2 + scalePointSize}
                    />
                );
            })}
            {selectedDots.length > 0 && dragging && (
                <DrawLine
                    key={'mouse'}
                    x1={
                        points[selectedDots[selectedDots.length - 1]].current!
                            .offsetLeft + scalePointSize
                    }
                    y1={
                        points[selectedDots[selectedDots.length - 1]].current!
                            .offsetTop + scalePointSize
                    }
                    x2={mousePos.x}
                    y2={mousePos.y}
                />
            )}
        </MySVG>
    );
};
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
    pointerEvents: 'none',
    zIndex: 2,
});
const DrawLine = styled.line({
    stroke: 'black',
    strokeWidth: '6px',
    strokeDasharray: 100,
    pointerEvents: 'none',
    zIndex: 2,
    animation: dash + ' 3s linear infinite',
});
