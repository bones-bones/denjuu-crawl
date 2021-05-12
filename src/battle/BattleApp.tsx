import styled from '@emotion/styled';
import React from 'react';
import { keyframes } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';
import { /*attackThunk,*/ p1Attack } from '../battle';
import { RootState } from '../store'
import { denjuuList, Sprites } from '../data/denjuu';
import { moveList } from '../data/moves';
//import { useWinCon } from './useWincon';

export const BattleApp = () => {
    const dispatch = useDispatch();
    const { p1, p2, activePlayer, battleLog } = useSelector(
        ({ battle }: RootState) => battle
    );
    // useWinCon();

    return (
        <>
            <Background>
                {p1 && <P1
                    hp={p1.stats.hp}
                    status={p1.status}
                    // garbage hack on the next lines, used a -1 cause of index stuff
                    sprites={denjuuList[p1.denjuuId - 1].sprites}
                    moveId={p1.activeMoveId}
                />}
                {p2 && <P2
                    hp={p2.stats.hp}
                    status={p2.status}
                    sprites={denjuuList[p2.denjuuId - 1].sprites}
                />}
            </Background>
            <BattleMessage>

                {battleLog.map((e, i) => (
                    <BattleLogMessage key={i}>{e}</BattleLogMessage>
                ))}
            </BattleMessage>
            <BottomNav>
                {p1 && denjuuList[p1.denjuuId].moves.map((move) => (
                    <MoveButton
                        disabled={!(activePlayer == 0)}
                        key={move}
                        onClick={() => {
                            // dispatch(attackThunk({ moveId: 0 }));
                            dispatch(p1Attack({ moveId: 0 }))
                        }}
                    >
                        {moveList[move].displayId}
                    </MoveButton>
                ))}
            </BottomNav>
        </>
    );
};

const BattleMessage = styled.div({
    width: '100vw',
    height: '9vh',
    backgroundColor: 'white',
    overflowY: 'scroll',
});

const BattleLogMessage = styled.span({ display: 'block', height: '3vh' });
const Background = styled.div({
    backgroundColor: 'green',
    height: '60vh',
    width: '97vw',
    borderRadius: '15px',
    borderTop: '1vh groove',
    borderLeft: '2vw groove',
    borderBottom: '0.5vh groove',
    borderRight: '1vw groove',
});

const BottomNav = styled.div({
    height: '19.5vh',
    width: '100vw',
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
}: {
    hp?: number;
    onClick?: () => void;
    status: string;
    sprites: Sprites;
}) => {
    return (
        <FloatSection
            top="15vh"
            right="5vw"
            onClick={onClick}
            status={status}
            key={'' + hp}
        >
            <HPSpan>HP: {hp}</HPSpan>
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

}: {
    hp?: number;
    status: string;
    sprites: Sprites;
    moveId?: number;
}) => {
    return (
        <FloatSection bottom="35vh" left="5vw" status={status} key={'' + hp}>
            <img
                width="100%"
                height="100%"
                src={sprites[status == 'attack' ? 'attack' : 'normal'].back}
            />
            <HPSpan>HP: {hp}</HPSpan>
        </FloatSection>
    );
};

const HPSpan = styled.span({
    color: 'white',
    fontWeight: 'bold',
    left: '-10px',
});
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
        position: 'fixed',
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
