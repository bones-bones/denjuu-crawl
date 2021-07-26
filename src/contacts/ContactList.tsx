import styled from '@emotion/styled';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { BorderedContainer } from '../components';
import { denjuuList, DenjuuTemplate, getDenjuuSprite } from '../data';
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
                    <BorderedContainer key={entry.instanceId}>
                        <DenjuuDiv
                            denjuuTemplate={denjuuTemplate}
                            playerDenjuu={playerDenjuu}
                            entry={entry}
                        />
                    </BorderedContainer>
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
    display: 'flex',
    flexWrap: 'wrap',
    alignContent: 'flex-start',
});

const DenjuuDiv = ({
    denjuuTemplate,
    playerDenjuu,
    entry,
}: {
    denjuuTemplate: DenjuuTemplate;
    playerDenjuu: PlayerDenjuuContactList;
    entry: PlayerDenjuu;
}) => {
    const [showDetails, setShowDetails] = useState<boolean>(false);
    return (
        <BigDiv>
            <DenjuuSummary
                onClick={() => {
                    setShowDetails(true);
                }}
            >
                <div>
                    {playerDenjuu.activeDenju == entry.instanceId && (
                        <ActiveStar>⭐</ActiveStar>
                    )}{' '}
                    <span>{denjuuTemplate.displayId}</span>{' '}
                    <Level>Lv{entry.level}</Level>
                </div>
                <ImageHolder src={getDenjuuSprite(denjuuTemplate.id)} />
                <HpBar
                    dir="ltr"
                    currentHp={entry.temporalStats.hp}
                    maxHp={entry.stats.hp}
                />
            </DenjuuSummary>
            {showDetails && (
                <Popup
                    closeCallback={() => {
                        setShowDetails(false);
                    }}
                >
                    <DenjuuDetails denjuu={entry} />
                </Popup>
            )}
        </BigDiv>
    );
};

const ActiveStar = styled.span({
    height: '10px',
    fontSize: '8px',
    display: 'inline-flex',
    //TODO: fix
});
const ImageHolder = styled.img({ imageRendering: 'pixelated' });

const BigDiv = styled.div({
    width: '30vw',
    height: '30vw',
    minWidth: '30vw',
    minHeight: '30vw',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
});

const DenjuuSummary = styled.div({
    height: '90%',
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'darkgray',
});

const Level = styled.span({
    fontSize: '12px',
    fontWeight: 'bold',
    fontKerning: 'inherit',
});
