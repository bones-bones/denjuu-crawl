
interface DenjuuTemplate {
    displayId: string,
    hp: number,
    dp: number,
    sprites: Sprites,
    type: MonsterType,
    moves: number[]
}
export interface Sprites { normal: { back: string, front: string }, attack: { back: string, front: string } }

enum MonsterType { Grassland = 'Grassland', Desert = 'Desert', Forest = 'Forest', Sky = 'Sky', Aquatic = 'Aquatic', Mountain = 'Mountain' }

export const denjuuList: DenjuuTemplate[] = [{
    displayId: 'Rex', type: MonsterType.Grassland, hp: 40, dp: 40,
    sprites: {
        normal: {
            back: 'https://wiki.telefang.net/images/0/0a/T2-000-B.gif',
            front: 'https://wiki.telefang.net/images/5/53/T2-000-F.gif'
        },
        attack: {
            back: 'https://wiki.telefang.net/images/7/73/T2-000-BA.gif',
            front: 'https://wiki.telefang.net/images/b/b7/T2-000-FA.gif'
        }
    },
    moves: [0]
}, {
    displayId: 'Mentalis', type: MonsterType.Desert, hp: 35, dp: 20,
    sprites: {
        normal: {
            back: 'https://wiki.telefang.net/images/2/2d/T2-026-B.gif',
            front: 'https://wiki.telefang.net/images/d/d6/T2-026-F.gif'
        },
        attack: {
            back: 'https://wiki.telefang.net/images/3/3c/T2-026-BA.gif',
            front: 'https://wiki.telefang.net/images/1/12/T2-026-FA.gif'
        }
    },
    moves: [1]
}]