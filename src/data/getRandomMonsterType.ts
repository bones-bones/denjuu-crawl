import { MonsterType } from './types';

export const randomMonsterType = () => {
    const types = [
        MonsterType.Aquatic,
        MonsterType.Desert,
        MonsterType.Forest,
        MonsterType.Grassland,
        MonsterType.Mountain,
        MonsterType.Sky,
    ];
    return types[Math.floor(Math.random() * types.length)];
};
