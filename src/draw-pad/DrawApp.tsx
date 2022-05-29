import React, { useRef } from 'react';

import { DrawPad } from './DrawPad';
import { IncomingAttack } from './types';

export const DrawApp = () => {
    const controlRef = useRef<(value: IncomingAttack) => void>();

    return (
        <>
            <button
                onClick={() => {
                    controlRef.current?.({
                        time: 3000,
                        id: Math.floor(Math.random() * 9),
                        pattern: [
                            Math.floor(Math.random() * 9),
                            Math.floor(Math.random() * 9),
                            Math.floor(Math.random() * 9),
                        ],
                    });
                }}
            >
                Test Add
            </button>
            <DrawPad
                patterns={[]}
                onMatch={() => {
                    //
                }}
                controlRef={controlRef}
            />
        </>
    );
};
