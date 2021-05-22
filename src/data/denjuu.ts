export interface DenjuuTemplate {
    id: number;
    displayId: string;
    stats: Stats;
    statLevelRates: Stats;
    sprites: Sprites;
    type: MonsterType;
    moves: number[];
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

enum MonsterType {
    Grassland = 'Grassland',
    Desert = 'Desert',
    Forest = 'Forest',
    Sky = 'Sky',
    Aquatic = 'Aquatic',
    Mountain = 'Mountain',
}

export const denjuuList: DenjuuTemplate[] = [
    {
        id: 1,
        displayId: 'Oshe',
        type: MonsterType.Mountain,
        stats: {
            hp: 32,
            speed: 8,
            attack: 8,
            defense: 10,
            denmaAttack: 4,
            denmaDefense: 4,
        },
        statLevelRates: {
            hp: 2,
            speed: 1,
            attack: 2,
            defense: 2,
            denmaAttack: 1,
            denmaDefense: 1,
        },
        sprites: {
            normal: {
                back: 'https://www.wiki.telefang.net/images/5/5e/T2-145-B.gif',
                front: 'https://www.wiki.telefang.net/images/0/0d/T2-145-F.gif',
            },
            attack: {
                back: 'https://www.wiki.telefang.net/images/0/01/T2-145-BA.gif',
                front:
                    'https://www.wiki.telefang.net/images/e/e5/T2-145-FA.gif',
            },
        },
        moves: [0],
    },
    {
        id: 2,
        displayId: 'Waratah',
        type: MonsterType.Forest,
        stats: {
            hp: 30,
            speed: 16,
            attack: 8,
            defense: 6,
            denmaAttack: 7,
            denmaDefense: 7,
        },
        statLevelRates: {
            hp: 1,
            speed: 1,
            attack: 2,
            defense: 2,
            denmaAttack: 2,
            denmaDefense: 2,
        },
        sprites: {
            normal: {
                back: 'https://www.wiki.telefang.net/images/e/ef/T2-156-B.gif',
                front: 'https://www.wiki.telefang.net/images/b/b3/T2-156-F.gif',
            },
            attack: {
                back: 'https://www.wiki.telefang.net/images/8/81/T2-156-BA.gif',
                front:
                    'https://www.wiki.telefang.net/images/b/b8/T2-156-FA.gif',
            },
        },
        moves: [1],
    },
    {
        id: 3,
        displayId: 'Angios',
        type: MonsterType.Sky,
        stats: {
            hp: 38,
            speed: 18,
            attack: 15,
            defense: 8,
            denmaAttack: 6,
            denmaDefense: 6,
        },
        statLevelRates: {
            hp: 2,
            speed: 2,
            attack: 2,
            defense: 2,
            denmaAttack: 1,
            denmaDefense: 1,
        },
        sprites: {
            normal: {
                back: 'https://www.wiki.telefang.net/images/4/49/T2-163-B.gif',
                front: 'https://www.wiki.telefang.net/images/a/a5/T2-163-F.gif',
            },
            attack: {
                back: 'https://www.wiki.telefang.net/images/7/75/T2-163-BA.gif',
                front:
                    'https://www.wiki.telefang.net/images/b/b2/T2-163-FA.gif',
            },
        },
        moves: [2, 3],
    },
    {
        id: 4,
        displayId: 'Fungus',
        type: MonsterType.Grassland,
        stats: {
            hp: 37,
            speed: 14,
            attack: 12,
            defense: 8,
            denmaAttack: 4,
            denmaDefense: 5,
        },
        statLevelRates: {
            hp: 2,
            speed: 2,
            attack: 2,
            defense: 2,
            denmaAttack: 1,
            denmaDefense: 1,
        },
        sprites: {
            normal: {
                back: 'https://www.wiki.telefang.net/images/5/5f/T2-167-B.gif',
                front: 'https://www.wiki.telefang.net/images/1/15/T2-167-F.gif',
            },
            attack: {
                back: 'https://www.wiki.telefang.net/images/c/c9/T2-167-BA.gif',
                front:
                    'https://www.wiki.telefang.net/images/d/df/T2-167-FA.gif',
            },
        },
        moves: [4, 5],
    },
];
