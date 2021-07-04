import { denjuuList, EffectType, getMoveAnimation, moveList } from '../data';
import { setTemporalHpTo, statModification } from '../playerDenjuu';
import { RootState } from '../store';
import { getTypeDamageRatio } from './getTypeDamageRatio';
import { nextTurnThunk } from './nextTurnThunk';
import {
    clearMove,
    delayedBattleMessageThunk,
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
    const {
        battle,
        contactList: { denjuu },
    } = getState();
    const playerDenjuu = denjuu.find(
        ({ instanceId }) => instanceId == battle.p1?.instanceId
    )!;
    const denjuuId = (player == '1'
        ? playerDenjuu.denjuuId
        : battle.p2?.denjuuId)!;

    const moveAnimation = getMoveAnimation(moveId);

    dispatch(showMove({ moveId, direction: player == '1' ? 'back' : 'front' }));
    dispatch(
        delayedBattleMessageThunk(
            `${denjuuList[denjuuId].displayId} used ${moveList[moveId].displayId}`,
            0
        )
    );

    setTimeout(() => {
        const sourceDenjuu = player == '1' ? playerDenjuu : battle.p2!;
        const targetDenjuu = player == '1' ? battle.p2! : playerDenjuu;

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
                if (player == '1') {
                    dispatch(p2TakeDamage({ damage }));
                } else {
                    dispatch(p1TakeDamage());
                    //setTemporalHpTo
                    dispatch(
                        setTemporalHpTo({
                            hp: playerDenjuu.temporalStats.hp - damage,
                            instanceId: playerDenjuu.instanceId,
                        })
                    );
                }
            } else if (effectEntry.effect.type == EffectType.StatChange) {
                const statMod = {
                    stat: effectEntry.effect.stat,
                    value: effectEntry.effect.value,
                };

                (effectEntry.target == 'self' && player == '1') ||
                (effectEntry.target == 'opponent' && player == '2')
                    ? dispatch(
                          statModification({
                              instanceId: playerDenjuu.instanceId,
                              mod: statMod,
                          })
                      )
                    : dispatch(p2StatModification(statMod));
            }
        });

        dispatch(nextTurnThunk());
    }, moveAnimation.duration);
};
