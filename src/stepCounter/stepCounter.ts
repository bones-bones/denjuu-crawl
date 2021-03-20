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

import { useEffect, useRef } from 'react';

export default function useEvent(handler: (args: any) => any, passive = false) {
    const savedHandler = useRef<() => void>();

    // Update ref.current value if handler changes.
    // This allows our effect below to always get latest handler ...
    // ... without us needing to pass it in effect deps array ...
    // ... and potentially cause effect to re-run every render.

    const metaHandler = handleHandleStep(handler);

    useEffect(() => {
        savedHandler.current = metaHandler;
    }, [metaHandler]);

    const metaMetaHandler = () => {
        savedHandler.current!();
    };
    useEffect(() => {
        if (window.innerWidth <= 800 && window.innerHeight <= 800) {
            sensor.addEventListener('reading', metaMetaHandler, passive);
            sensor.start();

            // this will clean up the event every time the component is re-rendered
            return () => {
                sensor.removeEventListener('reading', metaMetaHandler, passive);
                sensor.stop();
            };
        } else {
            const intervalFunction = setInterval(() => {
                console.log('tick');
                handler(true);
            }, 1000);
            return () => {
                clearInterval(intervalFunction);
            };
        }
    }); // when i have [] it counts too many steps i gues????
}
