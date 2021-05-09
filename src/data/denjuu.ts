export interface DenjuuTemplate {
    id: string;
    displayId: string;
    hp: number;
    speed: number;
    attack: number;
    defense: number;
    denmaAttack: number;
    denmaDefense: number;
    sprites: Sprites;
    type: MonsterType;
    moves: number[];
}
export interface Sprites {
    normal: { back: string; front: string };
    attack: { back: string; front: string };
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
        id: '1',
        displayId: 'Oshe',
        type: MonsterType.Mountain,
        hp: 32,
        speed: 8,
        attack: 8,
        defense: 10,
        denmaAttack: 4,
        denmaDefense: 4,
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
        id: '2',
        displayId: 'Waratah',
        type: MonsterType.Forest,
        hp: 30,
        speed: 16,
        attack: 8,
        defense: 6,
        denmaAttack: 7,
        denmaDefense: 7,
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
];
