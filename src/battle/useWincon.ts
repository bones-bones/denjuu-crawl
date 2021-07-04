import { useDispatch, useSelector } from 'react-redux';

import { denjuuList, getExperienceValue } from '../data';
import { experienceThunk, getDenjuuByInstanceId, setTemporalHpTo } from '../playerDenjuu';
import { RootState } from '../store';
import { declareWinner, delayedBattleMessageThunk } from './store';

export const useWinCon = () => {
    const p1 = useSelector(({ battle: { p1 } }: RootState) => p1!);
    const playerKnownDenjuu = useSelector(({ contactList: { denjuu } }: RootState) => getDenjuuByInstanceId(p1.instanceId, denjuu));
    const p2 = useSelector(({ battle: { p2 } }: RootState) => p2!);
    const winner = useSelector(({ battle: { winner } }: RootState) => winner);
    const dispatch = useDispatch();

    if (!p1 || !p2 || winner !== undefined) {
        return;
    }

    let p2Defeated = false;
    if (p2.temporalStats.hp <= 0) {
        p2Defeated = true;
    }
    let p1Defeated = false;
    if (playerKnownDenjuu.temporalStats.hp <= 0) {
        p1Defeated = true;
    }
    if (p1Defeated) {
        dispatch(
            setTemporalHpTo({
                hp: playerKnownDenjuu.temporalStats.hp,
                instanceId: playerKnownDenjuu.instanceId,
            })
        );
        dispatch(declareWinner('opponent'));
    } else if (p2Defeated) {
        dispatch(
            setTemporalHpTo({
                hp: playerKnownDenjuu.temporalStats.hp,
                instanceId: playerKnownDenjuu.instanceId,
            })
        );
        dispatch(declareWinner('player'));
        const expValue = getExperienceValue(p2.temporalStats!);

        dispatch(
            experienceThunk({
                instanceId: playerKnownDenjuu.instanceId,
                expValue: expValue,
            })
        );

        dispatch(
            delayedBattleMessageThunk(
                `${denjuuList[playerKnownDenjuu.denjuuId].displayId} gained ${expValue} exp.`,
                1000
            )
        );
        dispatch(
            delayedBattleMessageThunk(
                `It's safe to close the battle menu`,
                2000
            )
        );
    }
};
