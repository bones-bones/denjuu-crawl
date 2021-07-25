// https://www.wiki.telefang.net/List_of_moves_in_Telefang_1
// https://www.wiki.telefang.net/List_of_moves_in_Telefang_2_by_index_number

import { EffectType, Move, MoveType } from './types';

export const movesList2: Move[] = [
    {
        displayId: 'Dummy',
        type: MoveType.Normal,
        pattern: [0, 1, 2, 3, 4, 5, 6, 7, 8],
        effects: [
            {
                target: 'opponent',
                effect: { type: EffectType.Damage, value: 3 },
            },
        ],
    },
    {
        displayId: 'Claw',
        type: MoveType.Normal,
        pattern: [7, 4, 5],
        effects: [
            {
                effect: { type: EffectType.Damage, value: 8 },
                target: 'opponent',
            },
        ],
    },
    {
        displayId: 'Rush',
        type: MoveType.Normal,
        pattern: [7, 4, 1],
        effects: [
            {
                effect: { type: EffectType.Damage, value: 4 },
                target: 'opponent',
            },
        ],
    },
    {
        displayId: 'Strike',
        type: MoveType.Normal,
        pattern: [6, 3, 0],
        effects: [
            {
                effect: { type: EffectType.Damage, value: 4 },
                target: 'opponent',
            },
        ],
    },
    {
        displayId: 'Cat Punch',
        type: MoveType.Normal,
        pattern: [7, 4, 2],
        effects: [
            {
                effect: { type: EffectType.Damage, value: 4 },
                target: 'opponent',
            },
        ],
    },
    {
        displayId: 'Bison Hammer',
        type: MoveType.Normal,
        pattern: [7, 0, 1],
        effects: [
            {
                effect: { type: EffectType.Damage, value: 4 },
                target: 'opponent',
            },
        ],
    },
    {
        displayId: 'Kick',
        type: MoveType.Normal,
        pattern: [4, 7, 8],
        effects: [
            {
                effect: { type: EffectType.Damage, value: 4 },
                target: 'opponent',
            },
        ],
    },
    {
        displayId: 'Tail',
        type: MoveType.Normal,
        effects: [
            {
                effect: { type: EffectType.Damage, value: 4 },
                target: 'opponent',
            },
        ],
    },
    {
        displayId: 'Horn',
        type: MoveType.Normal,
        effects: [
            {
                effect: { type: EffectType.Damage, value: 8 },
                target: 'opponent',
            },
        ],
    },
    {
        displayId: 'Beak',
        type: MoveType.Normal,
        effects: [
            {
                effect: { type: EffectType.Damage, value: 4 },
                target: 'opponent',
            },
        ],
    },
    {
        displayId: 'Poison Sting',
        type: MoveType.Normal,
        effects: [
            {
                effect: { type: EffectType.Damage, value: 4 },
                target: 'opponent',
            },
        ],
    },
];

export const moveList: Move[] = [
    {
        displayId: 'Rush',
        type: MoveType.Normal,
        pattern: [7, 4, 1],
        effects: [
            {
                effect: { type: EffectType.Damage, value: 6 },
                target: 'opponent',
            },
        ],
    },
    {
        displayId: 'Bite',
        type: MoveType.Normal,
        pattern: [6, 3, 7],

        effects: [
            {
                effect: { type: EffectType.Damage, value: 6 },
                target: 'opponent',
            },
        ],
    },
    {
        displayId: 'Headbutt',
        type: MoveType.Normal,
        pattern: [4, 1, 7],

        effects: [
            {
                effect: { type: EffectType.Damage, value: 7 },
                target: 'opponent',
            },
        ],
    },
    {
        displayId: 'Gust',
        type: MoveType.Wind,
        pattern: [6, 3, 0],

        effects: [
            {
                effect: { type: EffectType.Damage, value: 6 },
                target: 'opponent',
            },
        ],
    },
    {
        //4
        displayId: 'Strike',
        pattern: [7, 4, 2],
        type: MoveType.Normal,
        effects: [
            {
                effect: { type: EffectType.Damage, value: 4 },
                target: 'opponent',
            },
        ],
    },
    {
        displayId: 'Speed',
        type: MoveType.Wind,
        pattern: [3, 1, 5],

        effects: [
            {
                effect: {
                    type: EffectType.StatChange,
                    stat: 'speed',
                    value: 6,
                },
                target: 'self',
            },
        ],
    },
    {
        displayId: 'Protect',
        pattern: [0, 1, 2],

        type: MoveType.Normal,
        effects: [
            {
                effect: {
                    type: EffectType.StatChange,
                    stat: 'defense',
                    value: 6,
                },
                target: 'self',
            },
        ],
    },
    {
        //7
        displayId: 'Glare',
        pattern: [3, 1, 4, 2],

        type: MoveType.Normal,
        effects: [
            {
                effect: {
                    type: EffectType.StatChange,
                    stat: 'defense',
                    value: -4,
                },
                target: 'opponent',
            },
        ],
    },
    {
        //8
        displayId: 'Lullaby',
        type: MoveType.Normal,
        pattern: [0, 3, 6, 7, 8],
        effects: [{ effect: { type: EffectType.Sleep }, target: 'opponent' }],
    },
    {
        //9
        displayId: 'Claw',
        type: MoveType.Normal,
        pattern: [7, 4, 5],

        effects: [
            {
                effect: { type: EffectType.Damage, value: 10 },
                target: 'opponent',
            },
        ],
    },
    {
        //10
        displayId: 'Flap',
        type: MoveType.Wind,
        pattern: [3, 0, 4, 2, 5],

        effects: [
            { effect: { type: EffectType.Fly }, target: 'self' },
            {
                effect: { type: EffectType.Damage, value: 4 },
                target: 'opponent',
            },
        ],
    },
    {
        //11
        displayId: 'Horn',
        type: MoveType.Machine,
        pattern: [7, 4, 1, 5],
        effects: [
            {
                effect: { type: EffectType.Damage, value: 10 },
                target: 'opponent',
            },
        ],
    },
    {
        //12
        displayId: 'Assault',
        type: MoveType.Normal,
        pattern: [7, 4, 0, 2],
        effects: [
            {
                effect: { type: EffectType.Damage, value: 15 },
                target: 'opponent',
            },
        ],
    },
    {
        //13
        displayId: 'Rock',
        type: MoveType.Rock,
        pattern: [3, 0, 1, 4],
        effects: [
            {
                effect: { type: EffectType.DenmaDamage, value: 15 },
                target: 'opponent',
            },
            {
                effect: {
                    type: EffectType.StatChange,
                    stat: 'defense',
                    value: 2,
                },
                target: 'self',
            },
        ],
    },
    {
        //14
        displayId: 'Rock Roll',
        type: MoveType.Rock,
        effects: [
            {
                effect: { type: EffectType.DenmaDamage, value: 15 },
                target: 'opponent',
            },
        ],
    },
    {
        //15
        displayId: 'Defend',
        type: MoveType.Rock,
        pattern: [6, 7, 8],

        effects: [
            {
                effect: {
                    type: EffectType.StatChange,
                    stat: 'defense',
                    value: 6,
                },
                target: 'self',
            },
        ],
    },
    {
        //16
        displayId: 'Mini Rock',
        type: MoveType.Rock,
        effects: [
            {
                effect: { type: EffectType.DenmaDamage, value: 7 },
                target: 'opponent',
            },
            {
                effect: {
                    type: EffectType.StatChange,
                    stat: 'defense',
                    value: 1,
                },
                target: 'self',
            },
        ],
    },
    {
        //17
        displayId: 'Evade',
        type: MoveType.Normal,
        effects: [
            {
                effect: {
                    type: EffectType.StatChange,
                    value: 7,
                    stat: 'defense',
                },
                target: 'self',
            },
            {
                effect: {
                    type: EffectType.StatChange,
                    value: 2,
                    stat: 'speed',
                },
                target: 'self',
            },
        ],
    },
    {
        //18
        displayId: 'Stab',
        type: MoveType.Normal,
        effects: [
            {
                effect: { type: EffectType.DenmaDamage, value: 10 },
                target: 'opponent',
            },
        ],
    },
    {
        //19
        displayId: 'Smokescreen',
        type: MoveType.Machine,
        effects: [
            {
                effect: {
                    type: EffectType.StatChange,
                    value: 3,
                    stat: 'defense',
                },
                target: 'self',
            },
            {
                effect: {
                    type: EffectType.StatChange,
                    value: 2,
                    stat: 'speed',
                },
                target: 'self',
            },
        ],
    },
    {
        //20
        displayId: 'Camoflage',
        type: MoveType.Machine,
        effects: [
            {
                effect: {
                    type: EffectType.StatChange,
                    value: 6,
                    stat: 'defense',
                },
                target: 'self',
            },
            {
                effect: {
                    type: EffectType.StatChange,
                    value: 6,
                    stat: 'speed',
                },
                target: 'self',
            },
        ],
    },
    {
        //21
        displayId: 'Invigorate',
        type: MoveType.Normal,
        effects: [
            {
                effect: {
                    type: EffectType.StatChange,
                    stat: 'attack',
                    value: 6,
                },
                target: 'self',
            },
        ],
    },
];
