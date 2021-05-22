import { Stats } from '../data/denjuu';

export interface Attack {
    moveId: number;
}
export interface Damage {
    damage: number;
}

export interface BattleState {
    p1?: BattleMonster;
    p2?: BattleMonster;
    activePlayer: number;
    battleLog: string[];
}

interface BattleMonster {
    status: 'attack' | 'damage' | 'static';
    stats: Stats;
    denjuuId: number;
    moves: number[];
    activeMoveId?: number;
    instanceId: string;
}

export interface BattleStart {
    player: {
        stats: Stats;
        moves: number[];
        denjuuId: number;
        instanceId: string;
    };
    enemy: {
        stats: Stats;
        moves: number[];
        denjuuId: number;
        level: number;
        instanceId: string;
    };
}
export interface EnemyStats {
    stats: Stats;
    moves: number[];
    denjuuId: number;
    level: number;
    instanceId: string;
}
