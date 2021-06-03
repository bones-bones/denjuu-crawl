export interface Move {
    displayId: string;
    animation?: string;
    effects: (DamageEffect | StatChangeEffect | FlyEffect | SleepEffect | DenmaDamageEffect)[];
    type: MoveType;
}
interface Effect {
    type: EffectType;
    target: 'self' | 'opponent';
}

interface DamageEffect extends Effect {
    type: EffectType.Damage;
    value: number;
}
interface DenmaDamageEffect extends Effect {
    type: EffectType.DenmaDamage;
    value: number;
}
interface StatChangeEffect extends Effect {
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
interface FlyEffect extends Effect {
    type: EffectType.Fly;
}
interface SleepEffect extends Effect {
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
}

export const moveList: Move[] = [
    {
        displayId: 'Rush',
        type: MoveType.Normal,
        effects: [{ type: EffectType.Damage, value: 6, target: 'opponent' }],
    },
    {
        displayId: 'Bite',
        type: MoveType.Normal,
        effects: [{ type: EffectType.Damage, value: 6, target: 'opponent' }],
    },
    {
        displayId: 'Headbutt',
        type: MoveType.Normal,
        effects: [{ type: EffectType.Damage, value: 7, target: 'opponent' }],
    },
    {
        displayId: 'Gust',
        type: MoveType.Wind,
        effects: [{ type: EffectType.Damage, value: 6, target: 'opponent' }],
    },
    {
        //4
        displayId: 'Strike',
        type: MoveType.Normal,
        effects: [{ type: EffectType.Damage, value: 4, target: 'opponent' }],
    },
    {
        displayId: 'Speed',
        type: MoveType.Wind,
        effects: [
            {
                type: EffectType.StatChange,
                stat: 'speed',
                value: 6,
                target: 'self',
            },
        ],
    },
    {
        displayId: 'Protect',
        type: MoveType.Normal,
        effects: [
            {
                type: EffectType.StatChange,
                stat: 'defense',
                value: 6,
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
                type: EffectType.StatChange,
                stat: 'defense',
                value: -6,
                target: 'opponent',
            },
        ],
    },
    {
        //8
        displayId: 'Lullaby',
        type: MoveType.Normal,
        effects: [{ type: EffectType.Sleep, target: 'opponent' }],
    },
    {
        //9
        displayId: 'Claw',
        type: MoveType.Normal,
        effects: [{ type: EffectType.Damage, value: 10, target: 'opponent' }],
    },
    {
        //10
        displayId: 'Flap',
        type: MoveType.Wind,
        effects: [
            { type: EffectType.Fly, target: 'self' },
            { type: EffectType.Damage, value: 4, target: 'opponent' },
        ],
    },
    {
        //11
        displayId: 'Horn',
        type: MoveType.Machine,
        effects: [{ type: EffectType.Damage, value: 10, target: 'opponent' }],
    },
    {
        //12
        displayId: 'Assault',
        type: MoveType.Normal,
        effects: [{ type: EffectType.Damage, value: 15, target: 'opponent' }],
    },
    {
        //13
        displayId: 'Rock',
        type: MoveType.Rock,
        effects: [{ type: EffectType.DenmaDamage, value: 15, target: 'opponent' }, {
            type: EffectType.StatChange,
            stat: 'defense',
            value: 2,
            target: 'self',
        }],
    },
];
