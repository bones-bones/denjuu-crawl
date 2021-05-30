import { getMoveAnimation } from '../data';
import { clearMove, p1Attack, p2Attack, showMove } from './store';

export const attackThunk = ({
    player,
    moveId,
}: {
    player: '1' | '2';
    moveId: number;
}) => (
    dispatch: any
    // getState: any
) => {
    // Animation block
    const move = getMoveAnimation(moveId);
    dispatch(showMove({ moveId, direction: player == '1' ? 'back' : 'front' }));
    // dispatch animation
    setTimeout(() => {
        dispatch(clearMove());
        //Dispatch effects
        dispatch(player == '1' ? p1Attack({ moveId }) : p2Attack({ moveId }));
    }, move.duration);
};
