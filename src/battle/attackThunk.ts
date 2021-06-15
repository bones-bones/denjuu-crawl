import { denjuuList, EffectType, getMoveAnimation, moveList } from '../data';
import { RootState } from '../store';
import { getTypeDamageRatio } from './getTypeDamageRatio';
import { nextTurnThunk } from './nextTurnThunk';
import {
    clearMove,
    delayedBattleMessageThunk,
    p1StatModification,
    p1TakeDamage,
    p2StatModification,
    p2TakeDamage,
    showMove,
} from './store';

export const attackThunk = ({
    player,
    moveId,
}: {
    player: '1' | '2';
    moveId: number;
}) => (dispatch: any, getState: () => RootState) => {
    // Animation block
    const moveAnimation = getMoveAnimation(moveId);
    dispatch(showMove({ moveId, direction: player == '1' ? 'back' : 'front' }));
    dispatch(
        delayedBattleMessageThunk(
            `${
                denjuuList[
                    getState().battle[player == '1' ? 'p1' : 'p2']!.denjuuId
                ].displayId
            } used ${moveList[moveId].displayId}`,
            0
        )
    );

    setTimeout(() => {
        const { battle } = getState() as RootState;
        const sourceDenjuu = player == '1' ? battle.p1! : battle.p2!;
        const targetDenjuu = player == '1' ? battle.p2! : battle.p1!;
        dispatch(clearMove());
        //Dispatch effects
        const move = moveList[moveId];
        move.effects.forEach((effectEntry) => {
            if (effectEntry.effect.type == EffectType.Damage) {
                const { level } = sourceDenjuu;
                const power = effectEntry.effect.value || 5;
                const templateTarget = denjuuList[targetDenjuu.denjuuId];

                //https://bulbapedia.bulbagarden.net/wiki/Damage#Damage_calculation
                const adRatio =
                    sourceDenjuu.temporalStats.attack /
                    targetDenjuu.temporalStats.defense;
                const moveDamage =
                    (((2 * level) / 5 + 2) * power * adRatio) / 5 + 2;
                const damage = Math.ceil(
                    moveDamage *
                        getTypeDamageRatio(move.type, templateTarget.type)
                );

                // Maybe the first part of the computation should be done here then the reducer should hadle the rest? Probably a future refactor
                dispatch(
                    player == '1'
                        ? p2TakeDamage({ damage })
                        : p1TakeDamage({ damage })
                );
            } else if (effectEntry.effect.type == EffectType.StatChange) {
                const statMod = {
                    stat: effectEntry.effect.stat,
                    value: effectEntry.effect.value,
                };

                (effectEntry.target == 'self' && player == '1') ||
                (effectEntry.target == 'opponent' && player == '2')
                    ? dispatch(p1StatModification(statMod))
                    : dispatch(p2StatModification(statMod));
            }
        });

        dispatch(nextTurnThunk());
    }, moveAnimation.duration);
};
