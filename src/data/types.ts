export interface DenjuuTemplate {
    id: number;
    displayId: string;
    stats: Stats;
    statLevelRates: Stats;
    sprites: Sprites;
    type: MonsterType;
    movesAtLevel: {
        [key: number]: number[];
    };
    experienceItems: {
        favorite?: number;
    };
}
export interface Sprites {
    normal: { back: string; front: string };
    attack: { back: string; front: string };
}

export interface Stats {
    hp: number;
    speed: number;
    attack: number;
    defense: number;
    denmaAttack: number;
    denmaDefense: number;
}

export enum MonsterType {
    Grassland = 'Grassland',
    Desert = 'Desert',
    Forest = 'Forest',
    Sky = 'Sky',
    Aquatic = 'Aquatic',
    Mountain = 'Mountain',
}
