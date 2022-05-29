import styled from '@emotion/styled';
import React from 'react';

import { getDenjuuSprite, getIsT1Sprite } from '../data';
import { HpBar } from '../hpBar';
import { statusToAnimation } from './statusToAnimation';
import { BattleMonster } from './types';

export const P1 = ({
    maxHp,
    hp,
    status,
    denjuuId,
}: {
    maxHp: number;
    hp: number;
    status: 'attack' | 'static';
    denjuuId: number;
}) => {
    const isT1Sprite = getIsT1Sprite(denjuuId);
    const imageDimensions = isT1Sprite ? '100vw' : '150vw';
    return (
        <FloatSection status={status} key={'' + hp}>
            <ImageHolder
                width={imageDimensions}
                src={getDenjuuSprite(denjuuId, status == 'attack', false)}
            />
            <HpBar dir="ltr" maxHp={maxHp} currentHp={hp} barWidth={100} />
        </FloatSection>
    );
};

const FloatSection = styled.div(({ status }: { status: string }) => ({
    ...{ animation: `${statusToAnimation(status)} 1s` },
    height: '45vw',
    width: '30vw',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
}));

export const P2 = ({
    hp,
    status,
    denjuu: {
        stats: { hp: maxHp },
        denjuuId,
    },
}: {
    hp: number;
    status: 'attack' | 'static';
    denjuu: BattleMonster;
}) => {
    const isT1Sprite = getIsT1Sprite(denjuuId);
    const imageDimensions = isT1Sprite ? '100vw' : '150vw';
    return (
        <FloatSection status={status} key={'' + hp}>
            <HpBar dir="rtl" maxHp={maxHp} currentHp={hp} barWidth={100} />

            <ImageHolder
                width={imageDimensions}
                src={getDenjuuSprite(denjuuId, status == 'attack')}
            />
        </FloatSection>
    );
};

const ImageHolder = styled.img({
    imageRendering: 'pixelated',
});
