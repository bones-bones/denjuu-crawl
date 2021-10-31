import { denjuuList, EffectType, getMoveAnimation, moveList } from '../data';
import { setTemporalHpTo, statModification } from '../playerDenjuu';
import { RootState } from '../store';
import { getTypeDamageRatio } from './getTypeDamageRatio';
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
    connects
}: {
    player: '1' | '2';
    moveId: number;
    connects: 'hit' | 'miss' | 'direct'
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
        let moveMultiplier = 0;
        dispatch(clearMove());
        //Dispatch effects
        const move = moveList[moveId];
        if (connects == 'miss') {
            dispatch(delayedBattleMessageThunk(
                `${denjuuList[denjuuId].displayId} missed!`,
                0
            ))
            return;
        } else if (connects == 'direct') {
            dispatch(delayedBattleMessageThunk(
                `${moveList[moveId].displayId} had a direct hit!`,
                0
            ));
            moveMultiplier = 1;
        } else if (connects == 'hit') {
            dispatch(delayedBattleMessageThunk(
                `${moveList[moveId].displayId} hit!`,
                0
            ));
            moveMultiplier = 0.5;
        }

        move.effects.forEach(({ effect, target }) => {
            if (effect.type == EffectType.Damage) {
                const { level } = sourceDenjuu;

                const power = (effect.value || 5) * moveMultiplier;
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
            } else if (effect.type == EffectType.StatChange) {
                const statMod = {
                    stat: effect.stat,
                    value: effect.value * moveMultiplier,
                };

                (target == 'self' && player == '1') ||
                    (target == 'opponent' && player == '2')
                    ? dispatch(
                        statModification({
                            instanceId: playerDenjuu.instanceId,
                            mod: statMod,
                        })
                    )
                    : dispatch(p2StatModification(statMod));
            }
        });

    }, moveAnimation.duration);
};
