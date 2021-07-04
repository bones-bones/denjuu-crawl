import styled from '@emotion/styled';
import React from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../store';
import { ItemView } from './ItemView';
export const InventoryView = () => {
    const inventory = useSelector(({ inventory }: RootState) => inventory);
    return (
        <BackgroundPanel>
            {inventory.items.map((entry) => (
                <ItemView key={entry.itemId} itemEntry={entry} />
            ))}
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
