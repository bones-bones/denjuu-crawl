import React, { forwardRef, Ref } from 'react';

import { Attack, DrawPoint, Player, PointBox } from './components';

type Props = {
    isSelected: boolean;
    selectable: boolean;
    playerThere: boolean;
    incomingAttacks: { time: number }[];
};

export const GridSection = forwardRef(
    (
        { isSelected, playerThere, incomingAttacks }: Props,
        ref: Ref<HTMLDivElement>
    ) => {
        const timeOrderedAttacks = incomingAttacks.sort(
            ({ time: timeA }, { time: timeB }) => timeA - timeB
        );
        return (
            <PointBox>
                {timeOrderedAttacks.map(({ time }, index) => (
                    <Attack key={index} time={time} />
                ))}
                {playerThere && <Player />}
                <DrawPoint ref={ref} isSelected={isSelected} />
            </PointBox>
        );
    }
);

GridSection.displayName = 'GridSection';
