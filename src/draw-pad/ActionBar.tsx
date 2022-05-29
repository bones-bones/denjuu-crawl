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
    const startArray = new Array(available).fill(EMPTY_CIRCLE);
    const playerArray = startArray.concat(new Array(used).fill(PARTIAL_CIRCLE));
    const filledArray = playerArray.concat(
        new Array(TOTAL_ALLOWED - available - used).fill(FULL_CIRCLE)
    );
    console.log(available, used, 'AB');

    return (
        <Bar>
            {filledArray.map((entry, index) => (
                <Dot key={index} type={entry}></Dot>
            ))}
        </Bar>
    );
};

const Bar = styled.div({
    display: 'flex',
    justifyContent: 'space-between',
});

const Dot = styled.div(({ type }: { type: '⚫️' | '⚪️' | '🔘' }) => ({
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
}));
