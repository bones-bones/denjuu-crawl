import { useDispatch, useSelector } from 'react-redux';
import { getExperienceValue } from '../data';
import { addExperience, setTemporalHpTo } from '../playerDenjuu';

import { RootState } from '../store';
import { endBattle } from './store';

export const useWinCon = () => {
    const p1 = useSelector(({ battle: { p1 } }: RootState) => p1!);
    const p2 = useSelector(({ battle: { p2 } }: RootState) => p2!);
    const dispatch = useDispatch();

    if (!p1 || !p2) {
        return;
    }

    let p2Defeated = false;
    if (p2.temporalStats.hp <= 0) {
        p2Defeated = true;
    }

    if (p2Defeated) {
        dispatch(
            addExperience({
                instanceId: p1.instanceId,
                value: getExperienceValue(p2.temporalStats!),
            })
        );
        dispatch(setTemporalHpTo({ hp: p1.temporalStats.hp, instanceId: p1.instanceId }))
        dispatch(endBattle());
    }
};
