import styled from '@emotion/styled';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { attackThunk } from '../battle';
import { moveList } from '../data';
import { DrawPad } from '../draw-pad';
import { RootState } from '../store';
import { AttackAnimation } from './AttackAnimation';
import { BattleLog } from './BattleLog';
import { battleFieldHeight, battlefieldWidth } from './constants';
import { P1, P2 } from './PlayerProfiles';
import { useWinCon } from './useWincon';

export const BattleApp = () => {
    const dispatch = useDispatch();
    const { p1, p2, battleLog, winner } = useSelector(
        ({ battle }: RootState) => battle
    );
    const playerDenjuu = useSelector(
        ({ contactList: { denjuu } }: RootState) =>
            denjuu.find(({ instanceId }) => instanceId === p1?.instanceId)!
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
            <AttackAnimation activeMove={activeMove} />
            <Battlefield>
                <DenjuuContainer>
                    {p1 && (
                        <P1
                            denjuuId={playerDenjuu.denjuuId}
                            hp={playerDenjuu.temporalStats.hp}
                            maxHp={playerDenjuu.stats.hp}
                            status={
                                activeMove?.direction == 'back'
                                    ? 'attack'
                                    : 'static'
                            }
                        />
                    )}

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
                </DenjuuContainer>
            </Battlefield>
            <BattleLog battleLog={battleLog} />
            <BottomNav>
                <MoveList>
                    {p1 &&
                        !winner &&
                        playerDenjuu.moves.map((moveId) => (
                            <>
                                <div>{moveList[moveId].displayId}</div>
                                <div>
                                    {moveList[moveId].pattern
                                        ?.map((entry) => entry + 1)
                                        .toString()}
                                </div>
                            </>
                        ))}
                </MoveList>
                {/* <DrawPad
                    patterns={playerDenjuu.moves.map((entry) => ({
                        value: entry,
                        pattern: moveList[entry].pattern || [0, 1, 2],
                    }))}
                    incommingAttackings={[]}
                    onMatch={(moveId: number) => {
                        dispatch(
                            attackThunk({
                                player: '1',
                                moveId,
                                connects: 'direct',
                            })
                        );
                    }}
                /> */}
            </BottomNav>
        </Container>
    );
};
const Container = styled.div({ paddingLeft: '1.5vw' });
const MoveList = styled.div({
    backgroundColor: 'white',
    flexDirection: 'row',
    display: 'flex',
});

const DenjuuContainer = styled.div({
    position: 'absolute',
    display: 'flex',
    top: '2vh',
    left: '5vw',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: `${battleFieldHeight - 5}vh`,
    width: '80vw',
});

const Battlefield = styled.div({
    backgroundColor: 'green',
    position: 'relative',

    height: `${battleFieldHeight}vh`,
    width: `${battlefieldWidth}vw`,
    display: 'flex',

    overflow: 'hidden',
});

const BottomNav = styled.div({
    height: '50vh',
    backgroundColor: '#333333',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: '90vw',
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
