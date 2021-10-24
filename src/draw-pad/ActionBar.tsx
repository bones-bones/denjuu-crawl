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
    return (
        <span>
            {new Array(available)
                .fill(FULL_CIRCLE)
                .concat(new Array(used).fill(PARTIAL_CIRCLE))
                .concat(
                    new Array(TOTAL_ALLOWED - available - used).fill(
                        EMPTY_CIRCLE
                    )
                )
                .join(' ')}
        </span>
    );
};
