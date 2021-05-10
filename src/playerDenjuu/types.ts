
import { Stats } from '../data/denjuu';

export interface PlayerDenjuu {

    stats: Stats;

    instanceId: string;
    denjuuId: number;
    level: number;
    exp: number;
    moves: number[];
    temporalStats: Stats
}

export interface PlayerDenjuuContactList {
    denjuu: PlayerDenjuu[];
    activeDenju: string;
}
