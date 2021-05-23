import styled from '@emotion/styled';
import React from 'react';
import {
    denjuuList,
    DenjuuTypeIcon,
    getExperienceNeededToLevel,
    moveList,
    MoveTypeIcon,
} from '../data';
import { PlayerDenjuu } from '../playerDenjuu';

export const DenjuuDetails = ({ denjuu }: { denjuu: PlayerDenjuu }) => {
    const denjuuTemplate = denjuuList.find(({ id }) => id === denjuu.denjuuId)!;

    return (
        <Container>
            <h3>
                {denjuuTemplate.displayId}{' '}
                <DenjuuTypeIcon type={denjuuTemplate.type} />
            </h3>
            <img src={denjuuTemplate.sprites.normal.front} />
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
                            <StatEntry entryColor={'#FFFF00'}>Max HP</StatEntry>
                        </td>
                        <td>{denjuu.stats.hp}</td>
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
                            {' '}
                            {denjuu.exp}/
                            {getExperienceNeededToLevel(denjuu.level + 1)}
                        </td>
                    </tr>
                </StatTable>
            </table>
            <MoveContainer>
                {denjuu.moves.map((entry) => (
                    <div key={entry}>
                        {' '}
                        {moveList[entry].displayId}
                        <MoveTypeIcon type={moveList[entry].type} />
                    </div>
                ))}
            </MoveContainer>
        </Container>
    );
};
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

// HP #FFFF00
// spped #9999CC
// attack #FF3300
// defense 33CC00
//CC9933 denma attack
// 33CC66 denma defense
