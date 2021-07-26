import styled from '@emotion/styled';
import React from 'react';

import { getMoveAnimation } from '../data';
import { battlefieldWidth } from './constants';
import { ActiveMove } from './types';

export const AttackAnimation = ({
    activeMove,
}: {
    activeMove?: ActiveMove;
}) => (
    <AttackField>
        {activeMove &&
            getMoveAnimation(activeMove.moveId).animation[
                activeMove.direction]()}
        {
            'ee' /*this is a hack cause SVG filter is not
    applied unless there is styling on the div i guess*/
        }
    </AttackField>
);

// https://codepen.io/tigt/pen/akYqAg
// This is garbage but it is good enough for now
const AttackField = styled.div({
    height: '20vh',
    //color
    top: '5vh',
    //  border: '0.001px hidden green',
    // backgroundColor: 'transparent',
    //backgroundColor: 'red',

    // Okay so, this sucks
    width: `${battlefieldWidth}vw`,
    color: 'green',
    position: 'absolute',

    overflow: 'hidden',
    zIndex: 5,

    filter: `url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg'>
    <filter id='b' x='0' y='0'>
        <feFlood x='2' y='2' height='2' width='2'/>
        <feComposite width='10' height='10'/>
        <feTile result='a'/>
        <feComposite in='SourceGraphic' in2='a' operator='in'/>
        <feMorphology operator='dilate' radius='4'/>
    </filter>
    </svg>`)}#b")`,
});
