import React from 'react';
import { MonsterType } from './types';
import Aquatic from '../images/denjuu_aquatic.gif';
import Desert from '../images/denjuu_desert.gif';
import Forest from '../images/denjuu_forest.gif';
import Grassland from '../images/denjuu_grassland.gif';
import Mountain from '../images/denjuu_mountain.gif';
import Sky from '../images/denjuu_sky.gif';
import styled from '@emotion/styled';

interface Props {
    type: MonsterType;
}
export const DenjuuTypeIcon = ({ type }: Props) => {
    const typeImageMapping = {
        [MonsterType.Aquatic]: Aquatic,
        [MonsterType.Desert]: Desert,
        [MonsterType.Forest]: Forest,
        [MonsterType.Grassland]: Grassland,
        [MonsterType.Mountain]: Mountain,
        [MonsterType.Sky]: Sky,
    };
    const TypeImage = new Image();
    TypeImage.src = typeImageMapping[type];
    return <ImageHolder src={typeImageMapping[type]} />;
};

const ImageHolder = styled.img({ imageRendering: 'pixelated' });
