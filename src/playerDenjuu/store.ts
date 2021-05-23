import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    denjuuList,
    getDenjuuAtLevel,
    getExperienceNeededToLevel,
    getStatsDifferenceForLevel,
} from '../data';
import { PlayerDenjuuContactList } from './types';

const initPlayerDenjuuLevel = 1;
const initialState: PlayerDenjuuContactList = {
    denjuu: [
        {
            stats: { ...getDenjuuAtLevel(1, initPlayerDenjuuLevel).stats },
            denjuuId: 1,
            instanceId: '1oshe',
            level: initPlayerDenjuuLevel,
            exp: 0,
            moves: getDenjuuAtLevel(1, 5).moves,
            temporalStats: {
                ...getDenjuuAtLevel(1, initPlayerDenjuuLevel).stats,
            },
        },
    ],
    activeDenju: '1oshe',
};

export const contactListSlice = createSlice({
    name: 'contactList',
    initialState,
    reducers: {
        setTemporalHpTo: (
            state,
            {
                payload: { hp, instanceId },
            }: PayloadAction<{ instanceId: string; hp: number }>
        ) => {
            state.denjuu.find(
                (entry) => entry.instanceId === instanceId
            )!.temporalStats.hp = hp;
        },
        addExperience: (
            state,
            {
                payload: { value, instanceId },
            }: PayloadAction<{ instanceId: string; value: number }>
        ) => {
            const denjuuInQuestion = state.denjuu.find(
                (entry) => entry.instanceId === instanceId
            )!;
            let newExpTotal =
                state.denjuu.find((entry) => entry.instanceId === instanceId)!
                    .exp + value;

            let nextLevel = getExperienceNeededToLevel(denjuuInQuestion.level);

            while (newExpTotal >= nextLevel) {
                const newStats = getStatsDifferenceForLevel(
                    denjuuInQuestion.denjuuId,
                    denjuuInQuestion.level,
                    1
                );
                denjuuInQuestion.level++;
                newExpTotal -= nextLevel;
                nextLevel = getExperienceNeededToLevel(denjuuInQuestion.level);
                denjuuInQuestion.stats.hp += newStats.hp;
                denjuuInQuestion.stats.speed += newStats.speed;
                denjuuInQuestion.stats.attack += newStats.attack;
                denjuuInQuestion.stats.defense += newStats.defense;
                denjuuInQuestion.stats.denmaDefense += newStats.denmaDefense;
                denjuuInQuestion.stats.denmaAttack += newStats.denmaAttack;
                denjuuInQuestion.temporalStats.hp = denjuuInQuestion.stats.hp;

                if (
                    denjuuList[denjuuInQuestion.denjuuId].movesAtLevel[
                        denjuuInQuestion.level
                    ]
                ) {
                    denjuuInQuestion.moves = denjuuInQuestion.moves.concat(
                        denjuuList[denjuuInQuestion.denjuuId].movesAtLevel[
                            denjuuInQuestion.level
                        ]
                    );
                }
            }
            denjuuInQuestion.exp = newExpTotal;
        },
    },
});

export const { setTemporalHpTo, addExperience } = contactListSlice.actions;
