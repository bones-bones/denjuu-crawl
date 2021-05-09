import React from 'react';
import { useHistory } from "react-router-dom";

import { Counter } from './Counter';
import { PlayerCanvas } from './PlayerCanvas';
export const StepApp = () => {
    // const history = useHistory();
    return <>

        <Counter />
        <PlayerCanvas />
    </>
}