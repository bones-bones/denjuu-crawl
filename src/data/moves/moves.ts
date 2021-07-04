// https://www.wiki.telefang.net/List_of_moves_in_Telefang_1
// https://www.wiki.telefang.net/List_of_moves_in_Telefang_2_by_index_number

import { EffectType, Move, MoveType } from './types';

export const movesList2: Move[] = [
    {
        displayId: 'Dummy',
        type: MoveType.Normal,
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
        effects: [{ effect: { type: EffectType.Sleep }, target: 'opponent' }],
    },
    {
        //9
        displayId: 'Claw',
        type: MoveType.Normal,
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
];
