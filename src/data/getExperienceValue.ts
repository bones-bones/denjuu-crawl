import { Stats } from './types';

export const getExperienceValue = ({
    speed,
    attack,
    defense,
    denmaAttack,
    denmaDefense,
}: Stats) =>
    Math.floor((speed + attack + defense + denmaAttack + denmaDefense) / 4);

export const getExperienceNeededToLevel = (level: number) =>
    level * level * level;
