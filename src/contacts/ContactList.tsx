import styled from '@emotion/styled';
import React from 'react';
import { useSelector } from 'react-redux';
import { denjuuList } from '../data/denjuu';
import { RootState } from '../store';
export const ContactList = () => {
    const playerDenjuu = useSelector(
        ({ contactList }: RootState) => contactList
    );

    return (
        <BackgroundPanel>
            {playerDenjuu.denjuu.map((entry) => {
                const denjuuTemplate = denjuuList.find(
                    ({ id }) => id === entry.denjuuId
                );

                if (denjuuTemplate) {
                    return (
                        <DenjuuDiv key={entry.instanceId}>
                            <div>
                                <span>{denjuuTemplate?.displayId}</span>
                                {playerDenjuu.activeDenju ==
                                    entry.instanceId && <span>⭐</span>}
                            </div>
                            <img src={denjuuTemplate?.sprites.normal.front} />
                            <br />

                            <span>
                                HP: {entry.temporalStats.hp}/{entry.hp}
                            </span>
                        </DenjuuDiv>
                    );
                }
                return (
                    <DenjuuDiv key={entry.instanceId}>
                        <span>
                            Unknown denjuu with iid = {entry.instanceId}
                        </span>
                    </DenjuuDiv>
                );
            })}
        </BackgroundPanel>
    );
};

const BackgroundPanel = styled.div({
    backgroundColor: 'lightgrey',
    height: '90vh',
    maxHeight: '90vh',
    overflow: 'scroll',
});

const DenjuuDiv = styled.div({
    width: '33vw',
    height: '33vw',
    border: '1px solid black',
});
