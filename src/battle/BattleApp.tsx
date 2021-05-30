import styled from '@emotion/styled';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { attackThunk, BattleMonster } from '../battle';
import { RootState } from '../store';
import { denjuuList, moveList, getMoveAnimation } from '../data';
import { useWinCon } from './useWincon';
import { HpBar } from '../hpBar';
import { BattleLog } from './BattleLog';
import { statusToAnimation } from './statusToAnimation';

export const BattleApp = () => {
    const dispatch = useDispatch();
    const { p1, p2, activePlayer, battleLog, winner } = useSelector(
        ({ battle }: RootState) => battle
    );
    const { hp: p1hp } = useSelector(
        ({ battle }: RootState) => battle.p1?.temporalStats || { hp: 0 }
    );
    const { hp: p2hp } = useSelector(
        ({ battle }: RootState) => battle.p2?.temporalStats || { hp: 0 }
    );
    const activeMove = useSelector(
        ({ battle: { activeMoveInfo } }: RootState) => activeMoveInfo
    );

    useWinCon();

    return (
        <Container>
            <Battlefield>
                {p1 && (
                    <P1
                        denjuu={p1}
                        hp={p1hp}
                        status={
                            activeMove?.direction == 'back'
                                ? 'attack'
                                : 'static'
                        }
                        // garbage hack on the next lines, used a -1 cause of index stuff
                        moveId={p1.activeMoveId}
                    />
                )}
                <AttackAnimation>
                    {activeMove &&
                        getMoveAnimation(activeMove.moveId).animation[
                            activeMove.direction
                        ]()}
                    {
                        'ee' /*this is a hack cause SVG filter is not
                    applied unless there is styling on the div i guess*/
                    }
                </AttackAnimation>
                {p2 && (
                    <P2
                        hp={p2hp}
                        denjuu={p2}
                        status={
                            activeMove?.direction == 'front'
                                ? 'attack'
                                : 'static'
                        }
                    />
                )}
            </Battlefield>
            <BattleLog battleLog={battleLog} />
            <BottomNav>
                {p1 &&
                    !winner &&
                    p1.moves.map((move) => (
                        <MoveButton
                            disabled={!(activePlayer == 0)}
                            key={move}
                            onClick={() => {
                                // dispatch(attackThunk({ moveId: 0 }));
                                // dispatch(p1Attack({ moveId: move }));
                                dispatch(
                                    attackThunk({ player: '1', moveId: move })
                                );
                            }}
                        >
                            {moveList[move].displayId}
                        </MoveButton>
                    ))}
                {p1 && p2 && winner && <div></div>}
            </BottomNav>
        </Container>
    );
};

const P2 = ({
    hp,
    status,
    denjuu,
}: {
    hp: number;
    status: string;
    denjuu: BattleMonster;
}) => (
    <FloatSection top="5vh" right="4vw" status={status} key={'' + hp}>
        <HpBar
            dir="rtl"
            maxHp={denjuu.stats.hp}
            currentHp={hp}
            barWidth={100}
        />

        <ImageHolder
            width="100%"
            height="100%"
            src={
                denjuuList[denjuu.denjuuId].sprites[
                    status == 'attack' ? 'attack' : 'normal'
                ].front
            }
        />
    </FloatSection>
);

const ImageHolder = styled.img({
    imageRendering: 'pixelated',
});

const P1 = ({
    hp,
    status,
    denjuu: {
        denjuuId,
        stats: { hp: maxHp },
    },
}: {
    hp: number;
    status: string;
    moveId?: number;
    denjuu: BattleMonster;
}) => (
    <FloatSection bottom="5vh" left="4vw" status={status} key={'' + hp}>
        <ImageHolder
            width="100%"
            height="100%"
            src={
                denjuuList[denjuuId].sprites[
                    status == 'attack' ? 'attack' : 'normal'
                ].back
            }
        />
        <HpBar dir="ltr" maxHp={maxHp} currentHp={hp} barWidth={100} />
    </FloatSection>
);

const FloatSection = styled.div(
    ({
        top,
        left,
        bottom,
        right,
        status,
    }: {
        top?: string;
        left?: string;
        bottom?: string;
        right?: string;
        status: string;
    }) => ({
        position: 'absolute',
        top,
        ...{ animation: `${statusToAnimation(status)} 1s` },
        left,
        height: '30vw',
        width: '30vw',
        bottom,
        right,
    })
);

const Container = styled.div({
    backgroundColor: 'rgba(0, 0, 0, 1)',
    borderRadius: '15px',

    borderTop: '1vh groove',
    borderLeft: '2vw groove',
    borderBottom: '0.5vh groove',
    borderRight: '1vw groove',
    overflow: 'hidden',
});

// https://codepen.io/tigt/pen/akYqAg
// This is garbage but it is good enough for now
const AttackAnimation = styled.div({
    height: '30vh',
    //color
    //  border: '0.001px hidden green',
    // backgroundColor: 'transparent',
    //backgroundColor: 'red',

    // Okay so, this sucks
    width: '50vw',
    color: 'green',
    position: 'absolute',
    top: '20vh',
    left: '20vw',
    overflow: 'hidden',

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

const Battlefield = styled.div({
    backgroundColor: 'green',
    position: 'relative',
    height: '60vh',
    width: '90vw',
    overflow: 'hidden',
});

const BottomNav = styled.div({
    height: '19.5vh',
    backgroundColor: '#333333',
    display: 'flex',
    justifyContent: 'center',
});
const MoveButton = styled.button({
    width: '33vw',
    border: '2px solid black',
});

/*
This effect tints a character
* filter: `url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg'>
    <filter id="linear">
    <feColorMatrix
    id="aa"
      type="matrix"
      values="1 0 0 1.9 -2.2
              0 1 0 0.0 0.3
              0 0 1 0 0.5
              0 0 0 1 0.2
              "/>
    <feComposite in='aa' in2='SourceGraphic' operator='in'/>
  </filter></svg>`)}#linear")`,
*/
