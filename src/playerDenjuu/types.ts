import { DenjuuTemplate } from '../data/denjuu';

export interface PlayerDenjuu
    extends Pick<
        DenjuuTemplate,
        'hp' | 'speed' | 'attack' | 'defense' | 'denmaAttack' | 'denmaDefense'
    > {
    instanceId: string;
    denjuuId: string;
    level: number;
    exp: number;
    moves: number[];
    temporalStats: {
        hp: number;
    };
}

export interface PlayerDenjuuContactList {
    denjuu: PlayerDenjuu[];
    activeDenju: string;
}
