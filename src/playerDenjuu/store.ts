import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getDenjuuAtLevel } from '../data';
import { PlayerDenjuuContactList } from './types';

const initialState: PlayerDenjuuContactList = {
    denjuu: [
        {
            stats: { ...getDenjuuAtLevel(1, 5).stats },
            denjuuId: 1,
            instanceId: '1oshe',
            level: 5,
            exp: 30,
            moves: [],
            temporalStats: { ...getDenjuuAtLevel(1, 5).stats },
        },
    ],
    activeDenju: '1oshe',
};

export const contactListSlice = createSlice({
    name: 'contactList',
    initialState,
    reducers: {
        setHpTo: (state, { payload: { hp, instanceId } }: PayloadAction<{ instanceId: string, hp: number }>) => {

            state.denjuu.find((entry) => entry.instanceId === instanceId)!.temporalStats.hp = hp;
        },
    },
});

export const { setHpTo } = contactListSlice.actions