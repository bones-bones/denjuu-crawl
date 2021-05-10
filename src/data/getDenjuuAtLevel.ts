import { denjuuList, DenjuuTemplate } from "./denjuu"


interface DenjuuSummary extends Pick<DenjuuTemplate, 'stats' | 'moves'> {
    denjuuId: number

}

export const getDenjuuAtLevel = (denjuuId: number, level: number) => {
    const baseDenjuu = denjuuList.find(({ id }) => { return id === denjuuId })!
    const newDenju: DenjuuSummary = { stats: { ...baseDenjuu.stats }, denjuuId: baseDenjuu.id, moves: { ...baseDenjuu.moves } }
    for (let i = 0; i < level; i++) {
        if (i % 2 == 0) {
            newDenju.stats.hp += baseDenjuu.statLevelRates.hp
            newDenju.stats.speed += baseDenjuu.statLevelRates.speed
            newDenju.stats.defense += baseDenjuu.statLevelRates.defense
            newDenju.stats.attack += baseDenjuu.statLevelRates.attack
            newDenju.stats.denmaAttack += baseDenjuu.statLevelRates.denmaAttack
            newDenju.stats.denmaDefense += baseDenjuu.statLevelRates.denmaDefense
        }
    }
    return newDenju;
}