import AngiosAttackBack from '../images/denjuu/angios_attack_back.gif';
import AngiosAttackFront from '../images/denjuu/angios_attack_front.gif';
import AngiosStandBack from '../images/denjuu/angios_stand_back.gif';
import AngiosStandFront from '../images/denjuu/angios_stand_front.gif';

import FungusAttackBack from '../images/denjuu/fungus_attack_back.gif';
import FungusAttackFront from '../images/denjuu/fungus_attack_front.gif';
import FungusStandBack from '../images/denjuu/fungus_stand_back.gif';
import FungusStandFront from '../images/denjuu/fungus_stand_front.gif';

import OsheAttackBack from '../images/denjuu/oshe_attack_back.gif';
import OsheAttackFront from '../images/denjuu/oshe_attack_front.gif';
import OsheStandBack from '../images/denjuu/oshe_stand_back.gif';
import OsheStandFront from '../images/denjuu/oshe_stand_front.gif';

import WaratahAttackBack from '../images/denjuu/waratah_attack_back.gif';
import WaratahAttackFront from '../images/denjuu/waratah_attack_front.gif';
import WaratahStandBack from '../images/denjuu/waratah_stand_back.gif';
import WaratahStandFront from '../images/denjuu/waratah_stand_front.gif';
import { DenjuuTemplate, MonsterType } from './types';

export const denjuuList: DenjuuTemplate[] = [
    {
        id: 1,
        displayId: 'Oshe',
        type: MonsterType.Mountain,
        stats: {
            hp: 32,
            speed: 8,
            attack: 8,
            defense: 10,
            denmaAttack: 4,
            denmaDefense: 4,
        },
        statLevelRates: {
            hp: 2,
            speed: 1,
            attack: 2,
            defense: 2,
            denmaAttack: 1,
            denmaDefense: 1,
        },
        sprites: {
            normal: {
                back: OsheStandBack,
                front: OsheStandFront,
            },
            attack: {
                back: OsheAttackBack,
                front: OsheAttackFront,
            },
        },
        movesAtLevel: {
            0: [0, 7],
            9: [8],
        },
    },
    {
        id: 2,
        displayId: 'Waratah',
        type: MonsterType.Forest,
        stats: {
            hp: 30,
            speed: 16,
            attack: 8,
            defense: 6,
            denmaAttack: 7,
            denmaDefense: 7,
        },
        statLevelRates: {
            hp: 1,
            speed: 1,
            attack: 2,
            defense: 2,
            denmaAttack: 2,
            denmaDefense: 2,
        },
        sprites: {
            normal: {
                back: WaratahStandBack,
                front: WaratahStandFront,
            },
            attack: {
                back: WaratahAttackBack,
                front: WaratahAttackFront,
            },
        },
        movesAtLevel: {
            0: [1, 8],
            15: [9],
        },
    },
    {
        id: 3,
        displayId: 'Angios',
        type: MonsterType.Sky,
        stats: {
            hp: 38,
            speed: 18,
            attack: 15,
            defense: 8,
            denmaAttack: 6,
            denmaDefense: 6,
        },
        statLevelRates: {
            hp: 2,
            speed: 2,
            attack: 2,
            defense: 2,
            denmaAttack: 1,
            denmaDefense: 1,
        },
        sprites: {
            normal: {
                back: AngiosStandBack,
                front: AngiosStandFront,
            },
            attack: {
                back: AngiosAttackBack,
                front: AngiosAttackFront,
            },
        },
        movesAtLevel: { 0: [0, 10], 8: [9] },
    },
    {
        id: 4,
        displayId: 'Fungus',
        type: MonsterType.Grassland,
        stats: {
            hp: 37,
            speed: 14,
            attack: 12,
            defense: 8,
            denmaAttack: 4,
            denmaDefense: 5,
        },
        statLevelRates: {
            hp: 2,
            speed: 2,
            attack: 2,
            defense: 2,
            denmaAttack: 1,
            denmaDefense: 1,
        },
        sprites: {
            normal: {
                back: FungusStandBack,
                front: FungusStandFront,
            },
            attack: {
                back: FungusAttackBack,
                front: FungusAttackFront,
            },
        },
        movesAtLevel: { 0: [4, 5], 11: [11] },
    },
];
