import styled from '@emotion/styled';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import {
    denjuuList,
    DenjuuTypeIcon,
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
                <DenjuuTypeIcon type={denjuuTemplate.type} />
            </h3>
            <ImageHolder src={denjuuTemplate.sprites.normal.front} />
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
    padding: '13px',
    fontSize: '12px',
    border: '1px solid black',
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
