interface Move {
    displayId: string;
    animation?: string;
    effects: { type: EffectType, value?: number }[],
    type: Type,
    dp: number
}

enum Type {
    Fire = 'Fire',
    Machine = 'Machine',
    Water = 'Water',
    Rock = 'Rock',
    Electric = 'Electric',
    Normal = 'Normal',
    Wind = 'Wind'
}
export enum EffectType {
    Damage = 'Damage'
}


export const moveList: Move[] = [
    { displayId: 'Claw', type: Type.Normal, dp: 0, effects: [{ type: EffectType.Damage, value: 5 }] },
    { displayId: 'Ion Beam', type: Type.Electric, dp: 30, effects: [{ type: EffectType.Damage, value: 35 }] }
]