import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
    denjuuList,
    getDenjuuAtLevel,
    getExperienceNeededToLevel,
    getStatsDifferenceForLevel,
} from '../data';
import { PlayerDenjuuContactList } from './types';

const initPlayerDenjuuLevel = 1;
const initPlayerDenjuuId = 0;

const initialState: PlayerDenjuuContactList =
    localStorage.getItem('reduxState') &&
    JSON.parse(localStorage.getItem('reduxState')!).contactList
        ? JSON.parse(localStorage.getItem('reduxState')!).contactList
        : {
              denjuu: [
                  {
                      stats: {
                          ...getDenjuuAtLevel(
                              initPlayerDenjuuId,
                              initPlayerDenjuuLevel
                          ).stats,
                      },
                      denjuuId: initPlayerDenjuuId,
                      instanceId: '1oshe',
                      level: initPlayerDenjuuLevel,
                      exp: 0,
                      moves: getDenjuuAtLevel(initPlayerDenjuuId, 5).moves,
                      temporalStats: {
                          ...getDenjuuAtLevel(
                              initPlayerDenjuuId,
                              initPlayerDenjuuLevel
                          ).stats,
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
            )!.temporalStats.hp = Math.min(
                hp,
                state.denjuu.find((entry) => entry.instanceId === instanceId)!
                    .stats.hp
            );
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
            let nextLevel = getExperienceNeededToLevel(
                denjuuInQuestion.level + 1
            );
            console.log(value, newExpTotal, nextLevel);

            while (newExpTotal >= nextLevel) {
                const newStats = getStatsDifferenceForLevel(
                    denjuuInQuestion.denjuuId,
                    denjuuInQuestion.level,
                    1
                );
                denjuuInQuestion.level++;
                newExpTotal -= nextLevel;
                nextLevel = getExperienceNeededToLevel(
                    denjuuInQuestion.level + 1
                );
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
