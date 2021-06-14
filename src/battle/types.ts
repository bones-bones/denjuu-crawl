import { Stats } from '../data';

export interface Attack {
    moveId: number;
}
export interface Damage {
    damage: number;
}

export interface StatModification {
    stat:
    | 'hp'
    | 'speed'
    | 'attack'
    | 'defense'
    | 'denmaAttack'
    | 'denmaDefense';
    value: number;
}

export interface ActiveMove {
    direction: 'front' | 'back';
    moveId: number;
}

export interface BattleState {
    p1?: BattleMonster;
    p2?: BattleMonster;
    activePlayer: '1' | '2';
    battleLog: string[];
    activeMoveInfo?: ActiveMove;
    winner?: 'player' | 'opponent';
    turnCount: number;
}

export interface BattleMonster {
    status: 'attack' | 'damage' | 'static';
    stats: Stats;
    temporalStats: Stats;
    denjuuId: number;
    moves: number[];
    activeMoveId?: number;
    instanceId: string;
    level: number;
    statusEffects: StatusEffect[]
}

export enum StatusEffect {
    Poison = 'Poison'
}

export interface BattleStart {
    player: {
        stats: Stats;
        temporalStats: Stats;
        moves: number[];
        denjuuId: number;
        instanceId: string;
        level: number;
    };
    enemy: {
        stats: Stats;
        temporalStats: Stats;
        moves: number[];
        denjuuId: number;
        level: number;
        instanceId: string;
    };
}
export interface EnemyStats {
    stats: Stats;
    moves: number[];
    temporalStats: Stats;
    denjuuId: number;
    level: number;
    instanceId: string;
}
