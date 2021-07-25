import styled from '@emotion/styled';
import React from 'react';

export const HpBar = ({
    dir,
    maxHp,
    currentHp,
    barWidth = 70,
}: {
    dir: 'ltr' | 'rtl';
    maxHp: number;
    currentHp: number;
    barWidth?: number;
}) => {
    return (
        <HPBox barWidth={barWidth} dir={dir}>
            <HPText>HP</HPText>
            <HPBar currentHp={currentHp} maxHp={maxHp} barWidth={barWidth} />
        </HPBox>
    );
};

const HPText = styled.div({
    backgroundColor: 'black',
    color: 'white',
    fontSize: '9px',
});
const HPBox = styled.div(
    ({ barWidth, dir }: { barWidth: number; dir: 'ltr' | 'rtl' }) => ({
        border: '2px solid black',
        width: `${barWidth}px`,
        backgroundColor: 'darkgrey',
        ...(dir == 'rtl'
            ? {
                  borderTopRightRadius: '5px',
                  borderBottomRightRadius: '5px',
              }
            : {
                  borderTopLeftRadius: '5px',
                  borderBottomLeftRadius: '5px',
              }),
        fontSize: '12px',

        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        height: '9px',
        minHeight: '9px',
    })
);
const HPBar = styled.div(
    ({
        currentHp,
        maxHp,
        barWidth,
    }: {
        currentHp: number;
        maxHp: number;
        barWidth: number;
    }) => ({
        backgroundColor: getColor(currentHp, maxHp),
        width: `${((barWidth - 13) / maxHp) * currentHp}px`,
        display: 'inline-flex',
        height: '7px',
    })
);

const getColor = (currentHp: number, maxHp: number) => {
    const ratio = currentHp / maxHp;
    if (ratio <= 0.2) {
        return '#ff3508';
    } else if (ratio <= 0.6) {
        return '#ffef16';
    } else {
        return '#11AA77';
    }
};
