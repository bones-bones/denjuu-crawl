export interface Move {
    displayId: string;
    animation?: string;
    effects: { type: EffectType; value?: number }[];
    type: Type;
}

export enum Type {
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
    SpeedUp = 'SpeedUp',
}

export const moveList: Move[] = [
    {
        displayId: 'Rush',
        type: Type.Normal,
        effects: [{ type: EffectType.Damage, value: 5 }],
    },
    {
        displayId: 'Bite',
        type: Type.Normal,
        effects: [{ type: EffectType.Damage, value: 6 }],
    },
    {
        displayId: 'Headbutt',
        type: Type.Normal,
        effects: [{ type: EffectType.Damage, value: 7 }],
    },
    {
        displayId: 'Gust',
        type: Type.Wind,
        effects: [{ type: EffectType.Damage, value: 6 }],
    },
    {
        displayId: 'Strike',
        type: Type.Normal,
        effects: [{ type: EffectType.Damage, value: 4 }],
    },
    {
        displayId: 'Spee',
        type: Type.Wind,
        effects: [{ type: EffectType.SpeedUp, value: 6 }],
    },
];
