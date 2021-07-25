import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import React, { useRef, useState } from 'react';

export const DrawPad = () => {
    const [draggon, setDraggon] = useState<boolean>(false);
    const [knownDots, setKnownDots] = useState<number[]>([]);
    const [mousePos, setMousePos] = useState<{ x: number; y: number }>({
        x: 0,
        y: 0,
    });
    const setKnownDotsWidID = (id: number) => {
        if (!knownDots.includes(id)) {
            setKnownDots([...knownDots].concat(id));
        }
    };
    const points = [
        useRef<HTMLDivElement>(null),
        useRef<HTMLDivElement>(null),
        useRef<HTMLDivElement>(null),
        useRef<HTMLDivElement>(null),
        useRef<HTMLDivElement>(null),
        useRef<HTMLDivElement>(null),
        useRef<HTMLDivElement>(null),
        useRef<HTMLDivElement>(null),
        useRef<HTMLDivElement>(null),
    ];
    const draPanelRef = useRef<HTMLDivElement>(null);

    const matchPatterns = [{ name: 'Attack', pattern: [7, 4, 1] }];
    return (
        <BackgroundPanel>
            !!{knownDots.toString()}
            {draggon ? 'dragging' : 'not tracked'}
            {
                matchPatterns.find(
                    ({ pattern }) => pattern.toString() == knownDots.toString()
                )?.name
            }
            <MySVG>
                {knownDots.slice(1).map((entry, index) => {
                    const { offsetLeft: x1, offsetTop: y1 } = points[
                        knownDots[index]
                    ].current!;
                    const { offsetLeft: x2, offsetTop: y2 } = points[
                        knownDots[index + 1]
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
                {knownDots.length > 0 && draggon && (
                    <DrawLine
                        key={'mouse'}
                        x1={
                            points[knownDots[knownDots.length - 1]].current!
                                .offsetLeft +
                            pointSize / 2
                        }
                        y1={
                            points[knownDots[knownDots.length - 1]].current!
                                .offsetTop +
                            pointSize / 2
                        }
                        x2={mousePos.x}
                        y2={mousePos.y}
                    />
                )}
            </MySVG>
            <DrawPanel
                draggable={false}
                ref={draPanelRef}
                onContextMenu={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    return false;
                }}
                onPointerDown={() => {
                    setDraggon(true);
                }}
                onPointerUp={() => {
                    setDraggon(false);
                    setKnownDots([]);
                }}
                onPointerMove={(event) => {
                    const {
                        left,
                        top,
                    } = draPanelRef.current!.getBoundingClientRect();
                    if (draggon) {
                        setMousePos({
                            x: event.clientX - left,
                            y: event.clientY - top,
                        });
                        const elementOver = document.elementFromPoint(
                            event.clientX,
                            event.clientY
                        );
                        const pointerIndex = points.findIndex((entry) => {
                            return entry.current == elementOver;
                        });
                        if (pointerIndex > -1) {
                            setKnownDotsWidID(pointerIndex);
                        }
                    }
                }}
            >
                {points.map((entry, index) => (
                    <PointBox key={index}>
                        <DrawPoint
                            ref={entry}
                            isSelected={knownDots.includes(index)}

                            //onPointerOver={addDot(index, setKnownDotsWidID)}
                        />
                    </PointBox>
                ))}
            </DrawPanel>
        </BackgroundPanel>
    );
};

const pointSize = 30;
const panelSize = 80;
const MySVG = styled.svg({
    position: 'absolute',
    width: panelSize + 'vw',
    height: panelSize + 'vw',
    touchAction: 'none',
});

const DrawPoint = styled.div(({ isSelected }: { isSelected: boolean }) => ({
    height: pointSize + 'px',
    width: pointSize + 'px',
    minHeight: pointSize + 'px',
    minWidth: pointSize + 'px',
    margin: '40px',
    touchAction: 'none',
    backgroundColor: isSelected ? 'red' : 'gray',
}));
const PointBox = styled.div({
    height: panelSize / 3 + 'vw',
    width: panelSize / 3 + 'vw',
    boxSizing: 'border-box',
    touchAction: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
});

const DrawPanel = styled.div({
    touchAction: 'none',
    border: '1px solid black',
    width: panelSize + 'vw',
    height: panelSize + 'vw',
    display: 'flex',
    justifyContent: 'space-around',
    position: 'absolute',
    flexWrap: 'wrap',
});
//const DrawRow = styled.div({ display: 'flex', justifyContent: 'space-around', })
const BackgroundPanel = styled.div({
    backgroundColor: 'lightgrey',
    height: panelSize + 'vw',
    maxHeight: panelSize + 'vw',
    width: panelSize + 'vw',
    overflow: 'hidden',
    display: 'flex',
    touchAction: 'none',

    justifyContent: 'center',
});
const dash = keyframes({
    to: {
        strokeDashoffset: -1000,
    },
});
const DrawLine = styled.line({
    stroke: 'black',
    strokeWidth: '6px',
    strokeDasharray: 100,
    animation: dash + ' 3s linear infinite',
});
