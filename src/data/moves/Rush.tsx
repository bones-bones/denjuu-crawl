import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';

const randomNumber = () => {
    return Math.floor(Math.random() * 150);
};

export const Rush = ({ front }: { front: boolean }) => {
    const tempArray = [
        { x: randomNumber(), y: randomNumber() },
        { x: randomNumber(), y: randomNumber() },
        { x: randomNumber(), y: randomNumber() },
        { x: randomNumber(), y: randomNumber() },
    ];
    return (
        <>
            {tempArray.map((entry) => (
                <Effect
                    key={entry.x}
                    bottom={entry.x}
                    right={entry.y}
                    front={front}
                />
            ))}
        </>
    );
};
// };
const styledAnimation = keyframes({
    '0%': { opacity: 1 },
    '100%': { opacity: 0 },
});

// const fadeOut = keyframes({
//     'from, 90%': {opacity: 1 },
//     'to, 100%': {opacity: 0 }
// })

const Effect = styled.div(
    ({
        bottom,
        right,
        front,
    }: {
        bottom: number;
        right: number;
        front: boolean;
    }) => ({
        position: 'absolute',
        minHeight: '10px',
        minWidth: '100px',

        ...(front ? { bottom } : { top: bottom }),
        right: right * 1.5,
        rotate: '-5deg',
        backgroundColor: 'white',
        //top: '50%',
        // left: offset,
        //opacity: 0,
        animation: /* fadeOut + " 1s, " +*/ styledAnimation + ' 0.25s infinite',
    })
);
