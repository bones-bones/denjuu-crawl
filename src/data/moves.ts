export interface Move {
    displayId: string;
    animation?: string;
    effects: {
        type: EffectType;
        value?: number;
        target: 'self' | 'opponent';
    }[];
    type: MoveType;
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
    SpeedChange = 'SpeedUp',
    DefenseChange = 'DefenseChange',
    Sleep = 'Sleep',
    Fly = 'Fly',
}

export const moveList: Move[] = [
    {
        displayId: 'Rush',
        type: MoveType.Normal,
        effects: [{ type: EffectType.Damage, value: 666, target: 'opponent' }],
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
        effects: [{ type: EffectType.SpeedChange, value: 6, target: 'self' }],
    },
    {
        displayId: 'Protect',
        type: MoveType.Normal,
        effects: [{ type: EffectType.DefenseChange, value: 6, target: 'self' }],
    },
    {
        displayId: 'Glare',
        type: MoveType.Normal,
        effects: [
            { type: EffectType.DefenseChange, value: -6, target: 'opponent' },
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
];
