import { DamageEffect, EffectType } from '../data';
import { BattleMonster, StatusEffect } from './types';

// takes a StatusEffect and returns a
export const getStatusEffect = (
    type: StatusEffect,
    denjuu: BattleMonster
): DamageEffect => {
    switch (type) {
        case StatusEffect.Poison: {
            return {
                type: EffectType.Damage,
                value: Math.floor((denjuu.temporalStats.hp / 10) * 3),
            };
        }
    }
};
