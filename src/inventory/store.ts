import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Inventory, ItemForTransaction } from './types';

export const name = 'inventory'
const initialState: Inventory =
    localStorage.getItem('reduxState') &&
        JSON.parse(localStorage.getItem('reduxState')!)[name]
        ? JSON.parse(localStorage.getItem('reduxState')!)[name]
        : {
            items: [{ itemId: 1, count: 3 }],
        };

export const inventorySlice = createSlice({
    name,
    initialState,
    reducers: {
        addItem: (
            state,
            {
                payload: { itemId, count = 1 },
            }: PayloadAction<ItemForTransaction>
        ) => {
            const itemInIndex = state.items.findIndex(
                (entry) => entry.itemId === itemId
            );
            if (itemInIndex > -1) {
                state.items[itemInIndex].count += count;
            } else {
                state.items.push({ count: 1, itemId });
            }
        },
        removeItem: (
            state,
            {
                payload: { itemId, count = 1 },
            }: PayloadAction<ItemForTransaction>
        ) => {
            const itemInIndex = state.items.findIndex(
                (entry) => entry.itemId === itemId
            );
            if (itemInIndex != -1) {
                state.items[itemInIndex].count -= count;
                if (state.items[itemInIndex].count <= 0) {
                    state.items.splice(itemInIndex, 1);
                }
            }
        },
    },
});

export const { addItem, removeItem } = inventorySlice.actions;
