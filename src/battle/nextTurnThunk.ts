//import { DamageEffect, DenmaDamageEffect, EffectType, FlyEffect, PoisonEffect, SleepEffect, StatChangeEffect } from "../data";
import { RootState } from '../store';
import { nextTurn } from './store';
//import { StatusEffect } from "./types";

export const nextTurnThunk = () => (
    dispatch: (...args: any[]) => void,
    getState: () => RootState
) => {
    const {
        battle,
        contactList: { denjuu },
    } = getState();

    const playerDenjuu = denjuu.find(
        ({ instanceId }) => instanceId == battle.p1?.instanceId
    )!;

    const p1SpeedFactor = 201 - playerDenjuu.temporalStats.speed!;
    const p2SpeedFactor = 201 - battle.p2?.temporalStats.speed!;
    let knowAnswer = false;
    let counter = battle.turnCount;
    let activePlayer: '1' | '2' = '1';

    if (counter % p2SpeedFactor === 0 && counter % p1SpeedFactor === 0) {
        knowAnswer = true;
        activePlayer = battle.activePlayer === '1' ? '2' : '1';
        counter++;
    }

    while (!knowAnswer) {
        counter++;
        if (counter % p1SpeedFactor === 0) {
            knowAnswer = true;
            activePlayer = '1';
        } else if (counter % p2SpeedFactor === 0) {
            knowAnswer = true;
            activePlayer = '2';
        }
    }

    //STATUS code

    dispatch(nextTurn({ turnCount: counter, activePlayer }));
};

// const statusEffects: { [key in StatusEffect]: DamageEffect
//     | StatChangeEffect
//     | FlyEffect
//     | SleepEffect
//     | DenmaDamageEffect | PoisonEffect } = {
//     [StatusEffect.Poison]: { type: EffectType.Poison, value: 5, target: 'opponent' }
// }
