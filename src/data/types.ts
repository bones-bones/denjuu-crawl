export interface DenjuuTemplate {
    id: number;
    stage: Stage;
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
    evolutions?: (NaturalEvolution | ModificationEvolution)[];
}
export interface Sprites {
    normal: { back: string; front: string };
    attack: { back: string; front: string };
}

export enum EvolutionTypes {
    Natural = 'Natural',
    Modification = 'Modification',
}

interface Evolution {
    type: EvolutionTypes;
    denjuuId: number;
}
interface NaturalEvolution extends Evolution {
    type: EvolutionTypes.Natural;
    level: number;
}
interface ModificationEvolution extends Evolution {
    type: EvolutionTypes.Modification;
    item: number;
}

export enum Stage {
    Natural = 'Natural',
    Cultivated = 'Cultivated',
    Techno = 'Techno',
    Big = 'Big',
    Burst = 'Burst',
    Explosion = 'Explosion',
    SuperMachine = 'SuperMachine',
    Super = 'Super',
    Demon = 'Demon',
    DarkSpace = 'DarkSpace',
    True = 'True',
    God = 'God',
    Devil = 'Devil',
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

export interface DenjuuSummary extends Pick<DenjuuTemplate, 'stats'> {
    denjuuId: number;
    moves: number[];
}
