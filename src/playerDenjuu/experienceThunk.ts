import { denjuuList, EvolutionTypes } from '../data';
import { RootState } from '../store';
import { addExperience, evolve } from './store';

export const experienceThunk = ({
    expValue,
    instanceId,
}: {
    expValue: number;
    instanceId: string;
}) => (dispatch: any, getState: () => RootState) => {
    const activeDenjuu = getState().contactList.denjuu.find(
        (entry) => entry.instanceId == instanceId
    )!;
    dispatch(
        addExperience({
            instanceId: instanceId,
            value: expValue,
        })
    );
    const afterLevel = getState().contactList.denjuu.find(
        (entry) => entry.instanceId == instanceId
    )!.level;
    const naturalEvolution = denjuuList[activeDenjuu.denjuuId].evolutions?.find(
        (entry) => entry.type == EvolutionTypes.Natural
    );
    if (
        naturalEvolution &&
        naturalEvolution.type == EvolutionTypes.Natural &&
        afterLevel >= naturalEvolution.level
    ) {
        dispatch(evolve({ instanceId, type: EvolutionTypes.Natural }));
    }
};
