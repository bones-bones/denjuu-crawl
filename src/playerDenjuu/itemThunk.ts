import { denjuuList, ItemEffectType, itemList } from '../data';
import { removeItem } from '../inventory';
import { RootState } from '../store';
import { addExperience, setTemporalHpTo } from './store';

export const itemThunk = ({
    itemId,
    instanceId,
}: {
    itemId: number;
    instanceId: string;
}) => (dispatch: any, getState: any) => {
    const itemData = itemList[itemId];
    const targetDenjuu = (getState() as RootState).contactList.denjuu.find(
        (entry) => {
            return entry.instanceId == instanceId;
        }
    )!;

    switch (itemData.effect.type) {
        case ItemEffectType.HealHp: {
            const tempporalHP = targetDenjuu.temporalStats.hp;
            dispatch(
                setTemporalHpTo({
                    instanceId,
                    hp: tempporalHP! + itemData.effect.value!,
                })
            );
            break;
        }
        case ItemEffectType.Experience: {
            const isFavorite =
                denjuuList[targetDenjuu.denjuuId].experienceItems.favorite ==
                itemId;
            dispatch(addExperience({ instanceId, value: isFavorite ? 20 : 0 }));
            break;
        }
    }

    dispatch(removeItem({ itemId }));
};
