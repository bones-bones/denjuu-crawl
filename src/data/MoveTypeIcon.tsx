import styled from '@emotion/styled';
import React from 'react';
import { MoveType } from "./moves";
import Electric from '../images/move_electric.gif'
import Fire from '../images/move_fire.gif'
import Machine from '../images/move_machine.gif'
import Normal from '../images/move_normal.gif'
import Rock from '../images/move_rock.gif'
import Water from '../images/move_water.gif'
import Wind from '../images/move_wind.gif'


interface Props {
    type: MoveType
}
export const MoveTypeIcon = ({ type }: Props) => {
    const typeImageMapping = {
        [MoveType.Electric]: Electric,
        [MoveType.Fire]: Fire,
        [MoveType.Machine]: Machine,
        [MoveType.Normal]: Normal,
        [MoveType.Rock]: Rock,
        [MoveType.Water]: Water,
        [MoveType.Wind]: Wind,
    };
    const TypeImage = new Image()
    TypeImage.src = typeImageMapping[type]
    return <img src={typeImageMapping[type]} />
}