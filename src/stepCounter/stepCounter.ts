const callbacks: ((args: any) => void)[] = [];
const sensor = new LinearAccelerationSensor();
enum Direction {
    POS = 'POS',
    NEG = 'NEG',
}

let lastVersion = Direction.NEG;
let z = 0;

function handleHandleStep(handler: (args?: any) => any) {
    return () => {
        if (sensor.z !== z) {
            z = sensor.z || 0;
            // This is where i assume i care because it is a big deal
            if (Math.abs(z) > 0.3) {
                const currentVersion = z > 0 ? Direction.POS : Direction.NEG;
                if (currentVersion != lastVersion) {
                    handler();
                    lastVersion = currentVersion;
                }
            }
        }
    };
}

export const addToStepHook = (func: (args: any) => any) => {
    callbacks.push(func);
};

import { useEffect } from 'react';

export default function useEvent(handler: (args: any) => any, passive = false) {
    const metaHandler = handleHandleStep(handler);
    useEffect(() => {
        // initiate the event handler
        sensor.addEventListener('reading', metaHandler, passive);
        sensor.start();

        // this will clean up the event every time the component is re-rendered
        return function cleanup() {
            sensor.removeEventListener('reading', metaHandler);
            sensor.stop();
        };
    });
}
