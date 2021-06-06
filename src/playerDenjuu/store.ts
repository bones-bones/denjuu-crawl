import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getNow } from '../common';
import {
    denjuuList,
    EvolutionTypes,
    getDenjuuAtLevel,
    getExperienceNeededToLevel,
    getStatsDifferenceForLevel,
} from '../data';
import { PlayerDenjuuContactList } from './types';

const initPlayerDenjuuLevel = 1;
const initPlayerDenjuuId = 0;
const secondPlayerDenjuuLevel = 2;
const secondPlayerDenjuuId = 2;
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
                  {
                      stats: {
                          ...getDenjuuAtLevel(
                              secondPlayerDenjuuId,
                              secondPlayerDenjuuLevel
                          ).stats,
                      },
                      denjuuId: secondPlayerDenjuuId,
                      instanceId: 'angios',
                      level: secondPlayerDenjuuLevel,
                      exp: 0,
                      moves: getDenjuuAtLevel(secondPlayerDenjuuId, 5).moves,
                      temporalStats: {
                          ...getDenjuuAtLevel(
                              secondPlayerDenjuuId,
                              secondPlayerDenjuuLevel
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
        evolve: (
            state,
            {
                payload: { instanceId, type },
            }: PayloadAction<{ instanceId: string; type: EvolutionTypes }>
        ) => {
            const denjuuToEvolve = state.denjuu.find(
                (entry) => entry.instanceId === instanceId
            )!;
            const denjuuTemplate = denjuuList[denjuuToEvolve.denjuuId];
            const targetEvolution = denjuuTemplate.evolutions?.find(
                (entry) => type == entry.type
            )!;
            denjuuToEvolve.denjuuId = targetEvolution.denjuuId;
            const evolutionAtCurrentLevel = getDenjuuAtLevel(
                targetEvolution.denjuuId,
                denjuuToEvolve.level
            );
            denjuuToEvolve.moves = evolutionAtCurrentLevel.moves;
        },
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
        healDenjuu: (
            state,
            {
                payload: { instanceId, value },
            }: PayloadAction<{ instanceId?: string; value: number }>
        ) => {
            const targetIid = instanceId || state.activeDenju;
            const targetDenjuu = state.denjuu.find(
                (entry) => entry.instanceId == targetIid
            )!;
            targetDenjuu.temporalStats.hp = Math.min(
                targetDenjuu.temporalStats.hp + value,
                targetDenjuu.stats.hp!
            );
        },
        setActive: (
            state,
            { payload: { instanceId } }: PayloadAction<{ instanceId: string }>
        ) => {
            state.activeDenju = instanceId;
        },
        newDenjuu: (
            state,
            {
                payload: { denjuuId, level },
            }: PayloadAction<{ denjuuId: number; level: number }>
        ) => {
            const denjuuStub = getDenjuuAtLevel(denjuuId, level);
            state.denjuu.push({
                exp: 0,
                level,
                instanceId: 'n' + getNow(),
                ...denjuuStub,
                temporalStats: denjuuStub.stats,
            });
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

export const {
    setTemporalHpTo,
    addExperience,
    healDenjuu,
    evolve,
    setActive,
    newDenjuu,
} = contactListSlice.actions;
