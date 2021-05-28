import styled from '@emotion/styled';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { /*attackThunk,*/ p1Attack } from '../battle';
import { RootState } from '../store';
import { denjuuList, Sprites } from '../data';
import { moveList } from '../data/moves';
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
    useWinCon();

    return (
        <Container>
            <Battlefield>
                {p1 && (
                    <P1
                        hp={p1hp}
                        maxHp={p1.stats.hp}
                        status={p1.status}
                        // garbage hack on the next lines, used a -1 cause of index stuff
                        sprites={denjuuList[p1.denjuuId].sprites}
                        moveId={p1.activeMoveId}
                    />
                )}
                <AttackAnimation>
                    <Bar />
                </AttackAnimation>
                {p2 && (
                    <P2
                        hp={p2hp}
                        maxHp={p2.stats.hp}
                        status={p2.status}
                        sprites={denjuuList[p2.denjuuId].sprites}
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
                                dispatch(p1Attack({ moveId: move }));
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
const Container = styled.div({
    backgroundColor: 'rgba(0, 0, 0, 1)',
    borderRadius: '15px',
    borderTop: '1vh groove',
    borderLeft: '2vw groove',
    borderBottom: '0.5vh groove',
    borderRight: '1vw groove',
    overflow: 'hidden',
});

// This is garbage but it is good enough for now
const AttackAnimation = styled.div({
    height: '25vh',
    backgroundColor: 'yellow',
    width: '50vw',
    position: 'absolute',
    top: '20vh',
    left: '20vw',
});

const Bar = styled.div({
    position: 'absolute',
    width: '100vw',
});

const Battlefield = styled.div({
    backgroundColor: 'green',
    position: 'relative',
    height: '60vh',
    width: '90vw',
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

const P2 = ({
    hp,
    onClick,
    status,
    sprites,
    maxHp,
}: {
    hp: number;
    onClick?: () => void;
    status: string;
    sprites: Sprites;
    maxHp: number;
}) => (
    <FloatSection
        top="5vh"
        right="4vw"
        onClick={onClick}
        status={status}
        key={'' + hp}
    >
        <HpBar dir="rtl" maxHp={maxHp} currentHp={hp} barWidth={100} />

        <ImageHolder
            width="100%"
            height="100%"
            src={sprites[status == 'attack' ? 'attack' : 'normal'].front}
        />
    </FloatSection>
);

const ImageHolder = styled.img({
    imageRendering: 'pixelated',
});

const P1 = ({
    hp,
    status,
    sprites,
    maxHp,
}: {
    hp: number;
    maxHp: number; //20
    status: string;
    sprites: Sprites;
    moveId?: number;
}) => (
    <FloatSection bottom="5vh" left="4vw" status={status} key={'' + hp}>
        <ImageHolder
            width="100%"
            height="100%"
            src={sprites[status == 'attack' ? 'attack' : 'normal'].back}
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
