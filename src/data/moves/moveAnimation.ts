import { Glare } from './Glare';

const moveSpeedFactor = 1;

export const moveAnimations: { [key: number]: MoveAnimation } = {
    // Glare
    7: {
        duration: 1000 * moveSpeedFactor,
        animation: {
            back: Glare,
            front: Glare,
        },
    },
};

interface MoveAnimation {
    duration: number;
    animation: { back: () => JSX.Element; front: () => JSX.Element };
}

export const getMoveAnimation = (moveId: number) => {
    return moveAnimations[moveId] || moveAnimations[7];
};
