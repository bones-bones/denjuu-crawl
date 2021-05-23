import { denjuuList, DenjuuTemplate, Stats } from './denjuu';

interface DenjuuSummary extends Pick<DenjuuTemplate, 'stats'> {
    denjuuId: number;
    moves: number[];
}

export const getDenjuuAtLevel = (denjuuId: number, level: number) => {
    const baseDenjuu = denjuuList.find(({ id }) => id === denjuuId)!;
    const movesKnowable = Object.entries(baseDenjuu.movesAtLevel)
        .filter(([key]) => parseInt(key) <= level)
        .map(({ 1: values }) => values)
        .flat();
    const moveKnown = movesKnowable.slice(
        Math.max(0, movesKnowable.length - 3)
    );

    const newDenju: DenjuuSummary = {
        stats: { ...baseDenjuu.stats },
        denjuuId: baseDenjuu.id,
        moves: moveKnown,
    };
    for (let i = 0; i < level; i++) {
        if (i % 2 == 0) {
            newDenju.stats.hp += baseDenjuu.statLevelRates.hp;
            newDenju.stats.speed += baseDenjuu.statLevelRates.speed;
            newDenju.stats.defense += baseDenjuu.statLevelRates.defense;
            newDenju.stats.attack += baseDenjuu.statLevelRates.attack;
            newDenju.stats.denmaAttack += baseDenjuu.statLevelRates.denmaAttack;
            newDenju.stats.denmaDefense +=
                baseDenjuu.statLevelRates.denmaDefense;
        }
    }
    return newDenju;
};

export const getStatsDifferenceForLevel = (
    denjuuId: number,
    baseLevel: number,
    levelsToAdd: number
) => {
    const baseDenjuu = denjuuList.find(({ id }) => id === denjuuId)!;

    const newStatSet: Stats = {
        hp: 0,
        attack: 0,
        speed: 0,
        defense: 0,
        denmaAttack: 0,
        denmaDefense: 0,
    };
    for (let i = baseLevel; i <= baseLevel + levelsToAdd; i++) {
        if (i % 2 == 0) {
            newStatSet.hp += baseDenjuu.statLevelRates.hp;
            newStatSet.speed += baseDenjuu.statLevelRates.speed;
            newStatSet.defense += baseDenjuu.statLevelRates.defense;
            newStatSet.attack += baseDenjuu.statLevelRates.attack;
            newStatSet.denmaAttack += baseDenjuu.statLevelRates.denmaAttack;
            newStatSet.denmaDefense += baseDenjuu.statLevelRates.denmaDefense;
        }
    }
    return newStatSet;
};
