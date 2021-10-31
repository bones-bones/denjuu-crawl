import styled from '@emotion/styled';
import React, { useRef, useState } from 'react';

import { useRequestInterval } from '../useRequentInterval';
import { ActionBar } from './ActionBar';
import { panelSize, timeInterval } from './constants';
import { DrawnLines } from './DrawnLines';
import { GridSection } from './GridSection';

interface MatchPattern {
    pattern: number[];
    value: number;
}

interface IncomingAttack {
    pattern: number[];
    time: number;
}

export const DrawPad = ({
    patterns,
    onMatch,
}: {
    patterns: MatchPattern[];
    onMatch: (value: MatchPattern['value']) => void;
}) => {
    const [draggon, setDraggon] = useState<boolean>(false);
    const [selectedDots, setSelectedDots] = useState<number[]>([]);
    const [availableDots, setAvailableDots] = useState<number>(0);
    const [playerPosition, setPlayerPosition] = useState<number>(0);
    const [incommingAttacks, setIncommingAttacks] = useState<IncomingAttack[]>([
        { pattern: [0, 1], time: 3000 },
    ]);

    useRequestInterval(() => {
        //if (!draggon) {
        setAvailableDots(Math.min(availableDots + 1, 9));
        //}
        incommingAttacks.forEach((entry) => {
            entry.time -= timeInterval;
        });

        const filteredAttacks = incommingAttacks.filter(
            ({ time }) => time >= 0
        );

        if (Math.floor(Math.random() * 6) > 4) {
            filteredAttacks.push({
                time: 3000,
                pattern: [
                    Math.floor(Math.random() * 9),
                    Math.floor(Math.random() * 9),
                    Math.floor(Math.random() * 9),
                ],
            });
        }

        setIncommingAttacks(filteredAttacks);
    }, timeInterval);

    const availableCircles = availableDots;
    const fullCr = availableCircles - selectedDots.length;
    const [mousePos, setMousePos] = useState<{ x: number; y: number }>({
        x: 0,
        y: 0,
    });
    const setSelectedDotsWidID = (id: number) => {
        if (!selectedDots.includes(id)) {
            setSelectedDots([...selectedDots].concat(id));
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
        <div>
            <ActionBar available={fullCr} used={selectedDots.length} />
            <br />
            <BackgroundPanel>
                <br />

                <DrawnLines
                    points={points}
                    mousePos={mousePos}
                    draggon={draggon}
                    selectedDots={selectedDots}
                />
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
                        const pattern = matchPatterns.find(({ pattern }) =>
                            selectedDots.toString().includes(pattern.toString())
                        );

                        setAvailableDots(availableDots - selectedDots.length);
                        if (pattern) {
                            onMatch(pattern.value);
                        }
                        const lastPos = selectedDots.pop();
                        if (lastPos) {
                            setPlayerPosition(lastPos);
                        }

                        setDraggon(false);
                        setSelectedDots([]);
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
                            const pointerIndex = points.findIndex(
                                (entry) => entry.current == elementOver
                            );
                            if (
                                pointerIndex > -1 &&
                                (pointerIndex == playerPosition ||
                                    selectedDots.includes(playerPosition)) &&
                                selectedDots.length < availableCircles
                            ) {
                                setSelectedDotsWidID(pointerIndex);
                            }
                        }
                    }}
                >
                    {points.map((entry, index) => (
                        <GridSection
                            key={index}
                            ref={entry}
                            isSelected={selectedDots.includes(index)}
                            selectable={selectedDots.length < availableCircles}
                            playerThere={index === playerPosition}
                            attackThere={incommingAttacks.some((entry) =>
                                entry.pattern.includes(index)
                            )}
                        />
                    ))}
                </DrawPanel>
            </BackgroundPanel>
        </div>
    );
};

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
    height: panelSize + 5 + 'vw',
    maxHeight: panelSize + 'vw',
    width: panelSize + 'vw',
    overflow: 'hidden',
    display: 'flex',
    touchAction: 'none',
    justifyContent: 'center',
});
