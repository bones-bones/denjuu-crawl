import styled from '@emotion/styled';
import React, { useState } from 'react';

import { BorderedContainer } from '../components';
import { itemList } from '../data';
import { ItemDenjuuSelector } from '../item-denjuu-selector';
import { BorderedPopup } from '../popup';

export const ItemView = ({
    itemEntry: { itemId, count },
}: {
    itemEntry: { itemId: number; count: number };
}) => {
    const [popupOpen, setPopupOpen] = useState(false);
    return (
        <>
            <BorderedContainer>
                <ItemContainer
                    key={itemId}
                    role="button"
                    onClick={() => {
                        setPopupOpen(true);
                    }}
                >
                    <span>{itemList[itemId].displayId}</span>
                    <div>
                        <ImageHolder src={itemList[itemId].image} />
                        <span>{count}</span>
                    </div>
                </ItemContainer>
            </BorderedContainer>
            {popupOpen && (
                <BorderedPopup
                    closeCallback={() => {
                        setPopupOpen(false);
                    }}
                >
                    <ItemDetailsView itemId={itemId} />
                </BorderedPopup>
            )}
        </>
    );
};
const ImageHolder = styled.img({ imageRendering: 'pixelated' });

const ItemContainer = styled.div({
    width: '25vw',
    height: '25vw',
    backgroundColor: 'white',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    display: 'inline-flex',
});

const ItemDetailsView = ({ itemId }: { itemId: number }) => {
    const [popupOpen, setPopupOpen] = useState(false);
    const itemData = itemList[itemId];

    return (
        <DetailsContainer>
            <span>{itemData.displayId}</span>
            <span>{itemData.description}</span>
            <div>
                <button
                    onClick={() => {
                        setPopupOpen(true);
                    }}
                >
                    Use Item
                </button>
            </div>
            {popupOpen && (
                <BorderedPopup
                    closeCallback={() => {
                        setPopupOpen(false);
                    }}
                >
                    <ItemDenjuuSelector
                        itemId={itemId}
                        selectionCallback={() => {
                            setPopupOpen(false);
                        }}
                    />
                </BorderedPopup>
            )}
        </DetailsContainer>
    );
};

const DetailsContainer = styled.div({
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
});
