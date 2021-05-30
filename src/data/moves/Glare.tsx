import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';

export const Glare = () => (
    <>
        <Bar offset={20} />
        <Bar offset={-10} />
    </>
);

const styledAnimation = keyframes({
    '0%': { backgroundColor: 'red' },
    '50%': { backgroundColor: 'yellow' },
});

const fadeOut = keyframes({
    'from, 90%': { opacity: 1 },
    'to, 100%': { opacity: 0 },
});

const Bar = styled.div(({ offset }: { offset: number }) => ({
    position: 'absolute',
    width: '100%',
    height: '5%',
    minHeight: '20px',
    rotate: '135deg',
    backgroundColor: 'red',

    top: '50%',
    left: offset,
    //opacity: 0,
    animation: fadeOut + ' 1s, ' + styledAnimation + ' 0.25s infinite',
}));
