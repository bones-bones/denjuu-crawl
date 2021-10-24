import styled from '@emotion/styled';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import {
    denjuuList,
    DenjuuTypeIcon,
    getDenjuuSprite,
    getExperienceNeededToLevel,
    moveList,
    MoveTypeIcon,
} from '../data';
import { ItemDenjuuSelector } from '../item-denjuu-selector';
import { PlayerDenjuu, setActive } from '../playerDenjuu';
import { Popup } from '../popup';

export const DenjuuDetails = ({ denjuu }: { denjuu: PlayerDenjuu }) => {
    const denjuuTemplate = denjuuList.find(({ id }) => id === denjuu.denjuuId)!;
    const [showItemMenu, setShowItemMenu] = useState<boolean>(false);
    const dispatch = useDispatch();

    return (
        <Container>
            <h3>
                {denjuuTemplate.displayId}
                <div style={{ width: '10vw' }}>
                    <DenjuuTypeIcon type={denjuuTemplate.type} />
                </div>
            </h3>
            <ImageHolder src={getDenjuuSprite(denjuu.denjuuId)} />
            <table>
                <StatTable>
                    <tr>
                        <td>
                            <StatEntry entryColor={''}>Level</StatEntry>
                        </td>
                        <td>{denjuu.level}</td>
                    </tr>
                    <tr>
                        <td>
                            <StatEntry entryColor={'#FEE12B'}>HP</StatEntry>
                        </td>
                        <td>{`${denjuu.temporalStats.hp}/${denjuu.stats.hp}`}</td>
                    </tr>
                    <tr>
                        <td>
                            <StatEntry entryColor={'#0066FF'}>Speed</StatEntry>
                        </td>
                        <td>{denjuu.stats.speed}</td>
                    </tr>
                    <tr>
                        <td>
                            <StatEntry entryColor={'#FF3300'}>Attack</StatEntry>
                        </td>
                        <td>{denjuu.stats.attack}</td>
                    </tr>
                    <tr>
                        <td>
                            <StatEntry entryColor={'#33CC00'}>
                                Defense
                            </StatEntry>
                        </td>
                        <td>{denjuu.stats.defense}</td>
                    </tr>
                    <tr>
                        <td>
                            <StatEntry entryColor={'#CC9933'}>
                                D. Attack
                            </StatEntry>
                        </td>
                        <td>{denjuu.stats.denmaAttack}</td>
                    </tr>
                    <tr>
                        <td>
                            <StatEntry entryColor={'#33CC66'}>
                                D. Defense
                            </StatEntry>
                        </td>
                        <td>{denjuu.stats.denmaDefense}</td>
                    </tr>
                    <tr>
                        <td>
                            <StatEntry entryColor={'#9999CC'}>
                                Experience
                            </StatEntry>
                        </td>
                        <td>
                            {`${denjuu.exp}/${getExperienceNeededToLevel(
                                denjuu.level + 1
                            )}`}
                        </td>
                    </tr>
                </StatTable>
            </table>
            <MoveContainer>
                {denjuu.moves.map((entry) => (
                    <MoveEntry key={entry}>
                        {moveList[entry].displayId}
                        {moveList[entry].pattern && (
                            <MovePattern pattern={moveList[entry].pattern!} />
                        )}
                        <MoveTypeIcon type={moveList[entry].type} />
                    </MoveEntry>
                ))}
            </MoveContainer>
            <ActionButtons>
                <ActionButton onClick={() => setShowItemMenu(true)}>
                    Use Item
                </ActionButton>
                <ActionButton
                    onClick={() => {
                        dispatch(setActive({ instanceId: denjuu.instanceId }));
                    }}
                >
                    Set as Active
                </ActionButton>
            </ActionButtons>
            {showItemMenu && (
                <Popup
                    closeCallback={() => {
                        setShowItemMenu(false);
                    }}
                >
                    <ItemDenjuuSelector
                        denjuuInstanceId={denjuu.instanceId}
                        selectionCallback={() => setShowItemMenu(false)}
                    />
                </Popup>
            )}
        </Container>
    );
};
const ActionButton = styled.button({});
const ActionButtons = styled.div({});

const ImageHolder = styled.img({ imageRendering: 'pixelated' });
const MoveEntry = styled.div({ display: 'flex', alignItems: 'center' });
const MoveContainer = styled.div({ borderTop: '1px solid black' });
const Container = styled.div({
    fontSize: '12px',
    backgroundColor: 'whitesmoke',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
});

const StatEntry = styled.div(({ entryColor }: { entryColor: string }) => ({
    color: entryColor,
}));

const StatTable = styled.tbody({
    fontWeight: 'bold',
});

const MovePattern = ({ pattern }: { pattern: number[] }) => {
    return (
        <MovePatternGrid>
            <MovePatternPoint x={0} y={0}>
                {pattern.indexOf(0) > -1 ? pattern.indexOf(0) : '.'}
            </MovePatternPoint>
            <MovePatternPoint x={1} y={0}>
                {pattern.indexOf(1) > -1 ? pattern.indexOf(1) : '.'}
            </MovePatternPoint>
            <MovePatternPoint x={2} y={0}>
                {pattern.indexOf(2) > -1 ? pattern.indexOf(2) : '.'}
            </MovePatternPoint>
            <MovePatternPoint x={0} y={1}>
                {pattern.indexOf(3) > -1 ? pattern.indexOf(3) : '.'}
            </MovePatternPoint>
            <MovePatternPoint x={1} y={1}>
                {pattern.indexOf(4) > -1 ? pattern.indexOf(4) : '.'}
            </MovePatternPoint>
            <MovePatternPoint x={2} y={1}>
                {pattern.indexOf(5) > -1 ? pattern.indexOf(5) : '.'}
            </MovePatternPoint>
            <MovePatternPoint x={0} y={2}>
                {pattern.indexOf(6) > -1 ? pattern.indexOf(6) : '.'}
            </MovePatternPoint>
            <MovePatternPoint x={1} y={2}>
                {pattern.indexOf(7) > -1 ? pattern.indexOf(7) : '.'}
            </MovePatternPoint>
            <MovePatternPoint x={2} y={2}>
                {pattern.indexOf(8) > -1 ? pattern.indexOf(8) : '.'}
            </MovePatternPoint>
        </MovePatternGrid>
    );
};
const MovePatternGrid = styled.div({
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 20px)',
    gridTemplateRows: 'repeat(3, 20px)',
    border: '1px solid black',
    alignItems: 'center',
    justifyItems: 'center',
});
const MovePatternPoint = styled.div(({ x, y }: { x: number; y: number }) => ({
    gridRow: y + 1,
    gridColumn: x + 1,
    display: 'flex',
    alignItems: 'center',
    justifyItems: 'center',
}));
