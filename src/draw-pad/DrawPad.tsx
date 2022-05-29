import styled from '@emotion/styled';
import React, { useEffect, useRef, useState } from 'react';

import { useRequestInterval } from '../useRequestInterval';
import { ActionBar } from './ActionBar';
import { panelSize, timeInterval } from './constants';
import { DrawnLines } from './DrawnLines';
import { GridSection } from './grid-section';
import { IncomingAttack, MatchPattern } from './types';

export const DrawPad = ({
    patterns,
    onMatch,
    onIncomingComplete,
    controlRef,
}: {
    patterns: MatchPattern[];
    onMatch: (value: MatchPattern['value']) => void;
    controlRef: any;
    onIncomingComplete?: (entry: {
        id: number;
        status: 'direct' | 'miss' | 'hit';
    }) => void;
}) => {
    const [dragging, setDragging] = useState<boolean>(false);
    const [selectedDots, setSelectedDots] = useState<number[]>([]);
    const [availableDots, setAvailableDots] = useState<number>(0);
    const [playerPosition, setPlayerPosition] = useState<number>(0);
    const [trackedAttacks, setTrackedAttacks] = useState<IncomingAttack[]>([]);
    useEffect(() => {
        controlRef.current = (value: IncomingAttack) => {
            setTrackedAttacks(trackedAttacks.concat(value));
        };
    }, []);

    useRequestInterval(() => {
        setAvailableDots(Math.min(availableDots + 1, 9));

        const filteredAttacks = trackedAttacks.filter((entry) => {
            entry.time -= timeInterval;
            if (entry.time <= 0) {
                let connects: 'direct' | 'miss' | 'hit' = 'miss';
                if (entry.pattern.includes(playerPosition)) {
                    connects = 'direct';
                } else if (
                    selectedDots.some((dot) => entry.pattern.includes(dot))
                ) {
                    connects = 'hit';
                }
                onIncomingComplete?.({ id: entry.id, status: connects });
                return false;
            }
            return true;
        });

        setTrackedAttacks(filteredAttacks);
    }, timeInterval);

    const [mousePos, setMousePos] = useState<{ x: number; y: number }>({
        x: 0,
        y: 0,
    });

    const points = useRef([
        useRef<HTMLDivElement>(null),
        useRef<HTMLDivElement>(null),
        useRef<HTMLDivElement>(null),
        useRef<HTMLDivElement>(null),
        useRef<HTMLDivElement>(null),
        useRef<HTMLDivElement>(null),
        useRef<HTMLDivElement>(null),
        useRef<HTMLDivElement>(null),
        useRef<HTMLDivElement>(null),
    ]);
    const draPanelRef = useRef<HTMLDivElement>(null);

    const setSelectedDotsWidID = (id: number) => {
        if (selectedDots[selectedDots.length - 1] != id) {
            setSelectedDots([...selectedDots].concat(id));
        }
    };

    const isValidAdd = (possibleIndex: number) => {
        return (
            possibleIndex >= 0 &&
            (possibleIndex == playerPosition ||
                selectedDots.includes(playerPosition)) &&
            selectedDots.length < availableDots
        );
    };
    return (
        <div>
            <ActionBar available={availableDots} used={selectedDots.length} />
            <BackgroundPanel>
                <br />
                <DrawnLines
                    points={points.current}
                    mousePos={mousePos}
                    dragging={dragging}
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
                        setDragging(true);
                    }}
                    onPointerUp={() => {
                        const pattern = patterns.find(({ pattern }) =>
                            selectedDots.toString().includes(pattern.toString())
                        );

                        setAvailableDots(availableDots - selectedDots.length);

                        if (pattern) {
                            onMatch(pattern.value);
                        }
                        const lastPos = selectedDots.pop();

                        if (lastPos !== undefined) {
                            setPlayerPosition(lastPos);
                        }

                        setDragging(false);
                        setSelectedDots([]);
                    }}
                    onPointerMove={({ clientX, clientY }) => {
                        const {
                            left,
                            top,
                        } = draPanelRef.current!.getBoundingClientRect();
                        if (dragging) {
                            setMousePos({
                                x: clientX - left,
                                y: clientY - top,
                            });
                            const elementOver = document.elementFromPoint(
                                clientX,
                                clientY
                            );
                            const pointerIndex = points.current.findIndex(
                                ({ current }) => current == elementOver
                            );
                            if (isValidAdd(pointerIndex)) {
                                setSelectedDotsWidID(pointerIndex);
                            }
                        }
                    }}
                >
                    {points.current.map((entry, index) => {
                        const filteredAttacks = trackedAttacks.filter(
                            ({ pattern }) => pattern.includes(index)
                        );

                        return (
                            <GridSection
                                key={index}
                                ref={entry}
                                isSelected={selectedDots.includes(index)}
                                selectable={selectedDots.length < availableDots}
                                playerThere={index === playerPosition}
                                incomingAttacks={filteredAttacks.map(
                                    ({ time }) => ({ time })
                                )}
                            />
                        );
                    })}
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
