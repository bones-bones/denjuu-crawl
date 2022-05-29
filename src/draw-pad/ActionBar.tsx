import styled from '@emotion/styled';
import React from 'react';

const FULL_CIRCLE = '⚫️';
const EMPTY_CIRCLE = '⚪️';
const PARTIAL_CIRCLE = '🔘';

const TOTAL_ALLOWED = 9;

export const ActionBar = ({
    available,
    used,
}: {
    available: number;
    used: number;
}) => {
    const aa = available - used;
    const startArray = new Array<typeof EMPTY_CIRCLE>(aa).fill(EMPTY_CIRCLE);
    const usedArray = new Array<typeof PARTIAL_CIRCLE>(used).fill(
        PARTIAL_CIRCLE
    );
    const consumedArray = new Array<typeof FULL_CIRCLE>(
        TOTAL_ALLOWED - aa - used
    ).fill(FULL_CIRCLE);

    const totalArray = [...startArray, ...usedArray, ...consumedArray];

    return (
        <Bar>
            {totalArray.map((entry, index) => (
                <Dot key={index} type={entry}></Dot>
            ))}
        </Bar>
    );
};

const Bar = styled.div({
    display: 'flex',
    justifyContent: 'space-between',
});

const Dot = styled.div(
    ({
        type,
    }: {
        type: typeof FULL_CIRCLE | typeof EMPTY_CIRCLE | typeof PARTIAL_CIRCLE;
    }) => ({
        height: '15px',
        width: '15px',
        borderRadius: '15px',
        border: '2px solid black',
        backgroundColor:
            type === FULL_CIRCLE
                ? 'black'
                : type === PARTIAL_CIRCLE
                ? 'gray'
                : 'white',
    })
);
