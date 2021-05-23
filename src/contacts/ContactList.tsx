import styled from '@emotion/styled';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { denjuuList, DenjuuTemplate } from '../data/denjuu';
import { HpBar } from '../hpBar';
import { PlayerDenjuu, PlayerDenjuuContactList } from '../playerDenjuu';
import { Popup } from '../popup';
import { RootState } from '../store';
import { DenjuuDetails } from './DenjuuDetails';
export const ContactList = () => {
    const playerDenjuu = useSelector(
        ({ contactList }: RootState) => contactList
    );


    return (
        <BackgroundPanel>
            {playerDenjuu.denjuu.map((entry) => {
                const denjuuTemplate = denjuuList.find(
                    ({ id }) => id === entry.denjuuId
                )!;
                return (
                    <DenjuuDiv denjuuTemplate={denjuuTemplate} playerDenjuu={playerDenjuu} entry={entry} key={entry.instanceId} />
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

const DenjuuDiv = ({ denjuuTemplate, playerDenjuu, entry }: { denjuuTemplate: DenjuuTemplate, playerDenjuu: PlayerDenjuuContactList, entry: PlayerDenjuu }) => {
    const [showDetails, setShowDetails] = useState<boolean>(false)
    console.log('render', showDetails);
    return <div><DenjuuSummary onClick={() => { setShowDetails(true) }}>
        <div>
            <span>{denjuuTemplate.displayId}</span>
            {playerDenjuu.activeDenju ==
                entry.instanceId && <span>⭐</span>}
        </div>
        <img src={denjuuTemplate.sprites.normal.front} />
        <HpBar dir='ltr' currentHp={entry.temporalStats.hp} maxHp={entry.stats.hp} />


    </DenjuuSummary>{showDetails && <Popup closeCallback={() => { console.log('eee'); setShowDetails(false); console.log(showDetails) }}>
        <DenjuuDetails denjuu={entry} />
    </Popup>}</div>

}

const DenjuuSummary = styled.div({
    width: '33vw',
    height: '33vw',
    border: '1px solid grey',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column'
});
