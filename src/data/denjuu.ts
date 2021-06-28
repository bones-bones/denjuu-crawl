import AmaruT1 from '../images/denjuu/amaru_t1.gif';
import AngiosAttackBack from '../images/denjuu/angios_attack_back.gif';
import AngiosAttackFront from '../images/denjuu/angios_attack_front.gif';
import AngiosStandBack from '../images/denjuu/angios_stand_back.gif';
import AngiosStandFront from '../images/denjuu/angios_stand_front.gif';
import AngiosT1 from '../images/denjuu/angios_t1.gif';
import CryptoT1 from '../images/denjuu/crypto_t1.gif';
import FungusAttackBack from '../images/denjuu/fungus_attack_back.gif';
import FungusAttackFront from '../images/denjuu/fungus_attack_front.gif';
import FungusStandBack from '../images/denjuu/fungus_stand_back.gif';
import FungusStandFront from '../images/denjuu/fungus_stand_front.gif';
import FungusT1 from '../images/denjuu/fungus_t1.gif';
import KeshiT1 from '../images/denjuu/keshi_t1.gif';
import KochiaT1 from '../images/denjuu/kochia_t1.gif';
import OsheAttackBack from '../images/denjuu/oshe_attack_back.gif';
import OsheAttackFront from '../images/denjuu/oshe_attack_front.gif';
import OsheStandBack from '../images/denjuu/oshe_stand_back.gif';
import OsheStandFront from '../images/denjuu/oshe_stand_front.gif';
import OsheT1 from '../images/denjuu/oshe_t1.gif';
import TsunonasuAttackBack from '../images/denjuu/tsunonasu_attack_back.gif';
import TsunonasuAttackFront from '../images/denjuu/tsunonasu_attack_front.gif';
import TsunonasuStandBack from '../images/denjuu/tsunonasu_stand_back.gif';
import TsunonasuStandFront from '../images/denjuu/tsunonasu_stand_front.gif';
import TsunonasuT1 from '../images/denjuu/tsunonasu_t1.gif';
import WaratahAttackBack from '../images/denjuu/waratah_attack_back.gif';
import WaratahAttackFront from '../images/denjuu/waratah_attack_front.gif';
import WaratahStandBack from '../images/denjuu/waratah_stand_back.gif';
import WaratahStandFront from '../images/denjuu/waratah_stand_front.gif';
import WaratahT1 from '../images/denjuu/waratah_t1.gif';
import { DenjuuTemplate, EvolutionTypes, MonsterType, Stage } from './types';

export const denjuuList: DenjuuTemplate[] = [
    {
        id: 0,
        displayId: 'Oshe',
        stage: Stage.Natural,
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
            t2: {
                normal: {
                    back: OsheStandBack,
                    front: OsheStandFront,
                },
                attack: {
                    back: OsheAttackBack,
                    front: OsheAttackFront,
                },
            },
            t1: OsheT1,
        },
        movesAtLevel: {
            0: [0, 7],
            9: [8],
        },
        experienceItems: {
            favorite: 5,
        },
        evolutions: [{ type: EvolutionTypes.Natural, level: 15, denjuuId: 4 }],
    },
    {
        id: 1,
        displayId: 'Waratah',
        stage: Stage.Cultivated,
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
            t2: {
                normal: {
                    back: WaratahStandBack,
                    front: WaratahStandFront,
                },
                attack: {
                    back: WaratahAttackBack,
                    front: WaratahAttackFront,
                },
            },
            t1: WaratahT1,
        },
        movesAtLevel: {
            0: [1, 8],
            15: [9],
        },
        experienceItems: {
            favorite: 6,
        },
    },
    {
        id: 2,
        displayId: 'Angios',
        stage: Stage.Cultivated,
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
            t2: {
                normal: {
                    back: AngiosStandBack,
                    front: AngiosStandFront,
                },
                attack: {
                    back: AngiosAttackBack,
                    front: AngiosAttackFront,
                },
            },
            t1: AngiosT1,
        },
        movesAtLevel: { 0: [0, 10], 8: [9] },
        experienceItems: {
            favorite: 7,
        },
    },
    {
        id: 3,
        displayId: 'Fungus',
        stage: Stage.Natural,
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
            t2: {
                normal: {
                    back: FungusStandBack,
                    front: FungusStandFront,
                },
                attack: {
                    back: FungusAttackBack,
                    front: FungusAttackFront,
                },
            },
            t1: FungusT1,
        },
        movesAtLevel: { 0: [4, 5], 11: [11] },
        experienceItems: {
            favorite: 3,
        },
    },
    {
        id: 4,
        displayId: 'Armaru',
        stage: Stage.Big,
        type: MonsterType.Mountain,
        stats: {
            hp: 32,
            speed: 12,
            attack: 12,
            defense: 11,
            denmaAttack: 7,
            denmaDefense: 9,
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
            t1: AmaruT1,
        },
        movesAtLevel: { 0: [12, 6, 7], 25: [13] },
        experienceItems: {
            favorite: 8,
        },
    },
    {
        id: 5,
        displayId: 'Tsunonasu',
        stage: Stage.Natural,
        type: MonsterType.Mountain,
        stats: {
            hp: 30,
            speed: 8,
            attack: 8,
            defense: 12,
            denmaAttack: 5,
            denmaDefense: 5,
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
            t1: TsunonasuT1,
            t2: {
                attack: {
                    front: TsunonasuAttackFront,
                    back: TsunonasuAttackBack,
                },
                normal: {
                    front: TsunonasuStandFront,
                    back: TsunonasuStandBack,
                },
            },
        },
        movesAtLevel: { 0: [0, 14], 8: [15], 18: [16] },
        experienceItems: { favorite: 9 },
    },
    {
        id: 6,
        displayId: 'Kochia',
        stage: Stage.Natural,
        type: MonsterType.Sky,
        stats: {
            hp: 30, speed: 16, attack: 10, defense: 5, denmaAttack: 6, denmaDefense: 5
        },
        statLevelRates: {
            hp: 2,
            speed: 2,
            attack: 2,
            defense: 2,
            denmaAttack: 2,
            denmaDefense: 1
        },
        sprites: { t1: KochiaT1 },
        movesAtLevel: { 0: [2, 17], 16: [18] },
        experienceItems: { favorite: 3 }
    },
    {
        id: 7,
        displayId: 'Keshi',
        stage: Stage.Natural,
        type: MonsterType.Grassland,
        stats: {
            hp: 30, speed: 14, attack: 8, defense: 8, denmaAttack: 6, denmaDefense: 5
        },
        statLevelRates: {
            hp: 2,
            speed: 1,
            attack: 2,
            defense: 2,
            denmaAttack: 2,
            denmaDefense: 2
        },
        sprites: { t1: KeshiT1 },
        movesAtLevel: { 0: [1, 19], 13: [20] },
        experienceItems: { favorite: 10 }
    },
    {
        id: 8,
        displayId: 'Crypto',
        stage: Stage.Natural,
        type: MonsterType.Forest,
        stats: {
            hp: 38, speed: 10, attack: 16, defense: 10, denmaAttack: 6, denmaDefense: 6
        },
        statLevelRates: {
            hp: 2,
            speed: 1,
            attack: 3,
            defense: 2,
            denmaAttack: 1,
            denmaDefense: 1
        },
        sprites: { t1: CryptoT1 },
        movesAtLevel: { 0: [2, 21], 11: [1] },
        experienceItems: { favorite: 2 }
    }
];
