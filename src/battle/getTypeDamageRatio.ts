import { MonsterType, MoveType } from '../data';
const superEffective = 2;
const effective = 1.5;
const notVeryEffective = 0.5;
const ineffective = 0.25;

//https://telefang.fandom.com/wiki/Electric
const atttackEffectivenessMatrix: {
    [key in MoveType]: {
        [key in MonsterType]?: number;
    };
} = {
    [MoveType.Normal]: {},
    [MoveType.Fire]: {
        [MonsterType.Mountain]: notVeryEffective,
        [MonsterType.Forest]: superEffective,
        [MonsterType.Desert]: ineffective,
        [MonsterType.Grassland]: effective,
    },
    [MoveType.Electric]: {
        [MonsterType.Sky]: effective,
        [MonsterType.Forest]: ineffective,
        [MonsterType.Aquatic]: superEffective,
        [MonsterType.Grassland]: notVeryEffective,
    },
    [MoveType.Water]: {
        [MonsterType.Mountain]: effective,
        [MonsterType.Sky]: ineffective,
        [MonsterType.Aquatic]: notVeryEffective,
        [MonsterType.Desert]: superEffective,
    },
    [MoveType.Wind]: {
        [MonsterType.Mountain]: ineffective,
        [MonsterType.Forest]: notVeryEffective,
        [MonsterType.Desert]: effective,
        [MonsterType.Grassland]: superEffective,
    },
    [MoveType.Rock]: {
        [MonsterType.Sky]: superEffective,
        [MonsterType.Aquatic]: effective,
        [MonsterType.Desert]: notVeryEffective,
        [MonsterType.Grassland]: ineffective,
    },
    [MoveType.Machine]: {
        [MonsterType.Mountain]: superEffective,
        [MonsterType.Sky]: notVeryEffective,
        [MonsterType.Forest]: effective,
        [MonsterType.Aquatic]: ineffective,
    },
};

export const getTypeDamageRatio = (
    moveType: MoveType,
    monsterType: MonsterType
) => atttackEffectivenessMatrix[moveType][monsterType] || 1;
