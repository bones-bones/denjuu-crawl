import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import React, { useRef, useState } from 'react';

import { useRequestInterval } from '../useRequentInterval';
import { ActionBar } from './ActionBar';

interface MatchPattern {
    pattern: number[],
    value: number
}



export const DrawPad = ({ patterns, onMatch }: { patterns: MatchPattern[], onMatch: (value: MatchPattern["value"]) => void }) => {
    const [draggon, setDraggon] = useState<boolean>(false);
    const [knownDots, setKnownDots] = useState<number[]>([]);
    const [availableDots, setAvailableDots] = useState<number>(0);


    useRequestInterval(() => { setAvailableDots(Math.min(availableDots + 1, 9)) }, 1500)

    const availableCircles = availableDots;
    const fullCr = availableCircles - knownDots.length;
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
    const matchPatterns = patterns;
    return (
        <BackgroundPanel>
            {/* !{knownDots.toString()}! */}
            {/* {matchPatterns.find(
                ({ pattern }) => pattern.toString() == knownDots.toString()
            )?.value} */}
            <br />
            <ActionBar available={fullCr} used={knownDots.length} />
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
                    const pattern = matchPatterns.find(
                        ({ pattern }) => pattern.toString() == knownDots.toString()
                    )
                    if (pattern) {
                        setAvailableDots(availableDots - pattern.pattern.length)
                        onMatch(pattern.value);

                    }

                    setDraggon(false);
                    setKnownDots([]);
                }}
                onPointerMove={({ clientX, clientY }) => {
                    const {
                        left,
                        top,
                    } = draPanelRef.current!.getBoundingClientRect();
                    if (draggon) {
                        setMousePos({
                            x: clientX - left,
                            y: clientY - top,
                        });
                        const elementOver = document.elementFromPoint(
                            clientX,
                            clientY
                        );
                        const pointerIndex = points.findIndex((entry) => {
                            return entry.current == elementOver;
                        });
                        if (pointerIndex > -1 && knownDots.length < availableCircles) {
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
                            selectable={knownDots.length < availableCircles}
                        />
                    </PointBox>
                ))}
            </DrawPanel>
        </BackgroundPanel >
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

const DrawPoint = styled.div(({ isSelected, selectable }: { isSelected: boolean, selectable: boolean }) => ({
    height: pointSize + 'px',
    width: pointSize + 'px',
    minHeight: pointSize + 'px',
    minWidth: pointSize + 'px',
    margin: '40px',
    touchAction: 'none',
    backgroundColor: isSelected ? 'red' : (selectable ? 'gray' : '#B7B7B7'),
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
