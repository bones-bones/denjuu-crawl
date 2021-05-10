import React from 'react';

import { Counter } from './Counter';
import { PlayerCanvas } from './PlayerCanvas';
export const StepApp = () => {
    // const history = useHistory();
    return (
        <>
            <Counter />
            <PlayerCanvas />
        </>
    );
};
