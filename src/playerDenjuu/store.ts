import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PlayerDenjuuContactList } from './types';

const initialState: PlayerDenjuuContactList = {
    denjuu: [
        {
            hp: 34,
            speed: 10,
            attack: 10,
            defense: 13,
            denmaAttack: 5,
            denmaDefense: 5,
            denjuuId: '1',
            instanceId: '1oshe',
            level: 2,
            exp: 30,
            moves: [],
            temporalStats: { hp: 34 },
        },
    ],
    activeDenju: '1oshe',
};

export const contactListSlice = createSlice({
    name: 'contactList',
    initialState,
    reducers: {
        ee: (state, { payload }: PayloadAction<string>) => {
            return state;
        },
    },
});
