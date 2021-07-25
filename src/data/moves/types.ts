export interface Move {
    displayId: string;
    animation?: string;
    effects: TargetedEffect[];
    type: MoveType;
    pattern?: number[]
}

interface TargetedEffect {
    effect:
    | DamageEffect
    | StatChangeEffect
    | FlyEffect
    | SleepEffect
    | DenmaDamageEffect;
    target: 'self' | 'opponent';
}

export interface Effect {
    type: EffectType;
}

export interface DamageEffect extends Effect {
    type: EffectType.Damage;
    value: number;
}
export interface PoisonEffect extends Effect {
    type: EffectType.Poison;
    value: number;
}
export interface DenmaDamageEffect extends Effect {
    type: EffectType.DenmaDamage;
    value: number;
}
export interface StatChangeEffect extends Effect {
    type: EffectType.StatChange;
    value: number;
    stat:
    | 'hp'
    | 'speed'
    | 'attack'
    | 'defense'
    | 'denmaAttack'
    | 'denmaDefense';
}
export interface FlyEffect extends Effect {
    type: EffectType.Fly;
}
export interface SleepEffect extends Effect {
    type: EffectType.Sleep;
}

export enum MoveType {
    Fire = 'Fire',
    Machine = 'Machine',
    Water = 'Water',
    Rock = 'Rock',
    Electric = 'Electric',
    Normal = 'Normal',
    Wind = 'Wind',
}

export enum EffectType {
    Damage = 'Damage',
    DenmaDamage = 'DenmaDamage',
    StatChange = 'StatChange',
    Sleep = 'Sleep',
    Fly = 'Fly',
    Poison = 'Poison',
}
