import { Glare } from "./Glare";

export const moveAnimations: { [key: number]: MoveAnimation } = {
    // Glare
    7: {
        duration: 1000,
        animation: Glare
    },
};

interface MoveAnimation {
    duration: number;
    animation: () => JSX.Element
}
