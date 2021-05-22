import { Stats } from './denjuu';

export const getExperienceValue = ({
    speed,
    attack,
    defense,
    denmaAttack,
    denmaDefense,
}: Stats) => {
    return Math.floor(
        (speed + attack + defense + denmaAttack + denmaDefense) / 4
    );
};
