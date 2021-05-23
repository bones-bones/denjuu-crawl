import styled from '@emotion/styled';
import React from 'react';
import { useSelector } from 'react-redux';
import { itemList } from '../data/items';
import { RootState } from '../store';
export const ItemView = () => {
    const inventory = useSelector(({ inventory }: RootState) => inventory);

    return (
        <BackgroundPanel>
            {inventory.items.map((entry) => (
                <ItemContainer key={entry.itemId}>
                    <span>{itemList[entry.itemId].displayId}</span>
                    <div>
                        <img src={itemList[entry.itemId].image} />
                        <span>{entry.count}</span>
                    </div>
                </ItemContainer>
            ))}
        </BackgroundPanel>
    );
};

const ItemContainer = styled.div({
    width: '25vw',
    height: '25vw',
    border: '1px solid black',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    display: 'inline-flex',
});

const BackgroundPanel = styled.div({
    backgroundColor: 'lightgrey',
    height: '90vh',
    maxHeight: '90vh',
    overflow: 'scroll',
    display: 'flex',
    flexWrap: 'wrap',
    alignContent: 'flex-start',
});
