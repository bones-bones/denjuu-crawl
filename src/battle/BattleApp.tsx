import styled from '@emotion/styled';
import React from 'react';
import { keyframes } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';
import { /*attackThunk,*/ p1Attack } from '../battle';
import { RootState } from '../store';
import { denjuuList, Sprites } from '../data/denjuu';
import { moveList } from '../data/moves';
import { useWinCon } from './useWincon';
import { HpBar } from '../hpBar';

export const BattleApp = () => {
    const dispatch = useDispatch();
    const { p1, p2, activePlayer, battleLog } = useSelector(
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
            <Background>
                {p1 && (
                    <P1
                        hp={p1hp}
                        maxHp={p1.stats.hp}
                        status={p1.status}
                        // garbage hack on the next lines, used a -1 cause of index stuff
                        sprites={denjuuList[p1.denjuuId - 1].sprites}
                        moveId={p1.activeMoveId}
                    />
                )}
                {p2 && (
                    <P2
                        hp={p2hp}
                        maxHp={p2.stats.hp}
                        status={p2.status}
                        sprites={denjuuList[p2.denjuuId - 1].sprites}
                    />
                )}
            </Background>
            <BattleMessage>
                {battleLog.map((e, i) => (
                    <BattleLogMessage key={i}>{e}</BattleLogMessage>
                ))}
            </BattleMessage>
            <BottomNav>
                {p1 &&
                    p1.moves.map((move) => (
                        <MoveButton
                            disabled={!(activePlayer == 0)}
                            key={move}
                            onClick={() => {
                                // dispatch(attackThunk({ moveId: 0 }));
                                dispatch(p1Attack({ moveId: 0 }));
                            }}
                        >
                            {moveList[move].displayId}
                        </MoveButton>
                    ))}
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

const BattleMessage = styled.div({
    height: '9vh',
    backgroundColor: 'white',
    overflowY: 'scroll',
});

const BattleLogMessage = styled.span({ display: 'block', height: '3vh' });

const Background = styled.div({
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
    maxHp
}: {
    hp: number;
    onClick?: () => void;
    status: string;
    sprites: Sprites;
    maxHp: number
}) => {
    return (
        <FloatSection
            top="5vh"
            right="4vw"
            onClick={onClick}
            status={status}
            key={'' + hp}
        >
            <HpBar dir='rtl' maxHp={maxHp} currentHp={hp} barWidth={100} />

            <img
                width="100%"
                height="100%"
                src={sprites[status == 'attack' ? 'attack' : 'normal'].front}
            />
        </FloatSection>
    );
};

const P1 = ({
    hp,
    status,
    sprites,
    maxHp
}: {
    hp: number;
    maxHp: number;
    status: string;
    sprites: Sprites;
    moveId?: number;
}) => {
    return (
        <FloatSection bottom="5vh" left="4vw" status={status} key={'' + hp}>
            <img
                width="100%"
                height="100%"
                src={sprites[status == 'attack' ? 'attack' : 'normal'].back}
            />
            <HpBar dir='ltr' maxHp={maxHp} currentHp={hp} barWidth={100} />
        </FloatSection>
    );
};


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

const statusToAnimation = (status: string) => {
    switch (status) {
        case 'damage': {
            return damageKf;
        }
        default:
            return kf;
    }
};

const kf = keyframes`
from, 20%, 53%, 80%, to {
    transform: translate3d(0,0,0);
  }

  40%, 43% {
    transform: translate3d(0, -30px, 0);
  }

  70% {
    transform: translate3d(0, -15px, 0);
  }

  90% {
    transform: translate3d(0,-4px,0);
  }`;

const damageKf = keyframes`
from, 20%, 53%, 80%, to {
    transform: translate3d(0,0,-135px);
  }

  30% {
    transform: perspective(500px) translate3d( 30px,0, 0);
    background-color:red;
    border-radius:10px;
  }

  70% {
    transform: translate3d( 15px,0, 0);
  }

  90% {
    transform: translate3d(4px,0,0);
  }
`;
