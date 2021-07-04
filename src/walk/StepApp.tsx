import styled from '@emotion/styled';
import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../store';
import { Counter } from './Counter';
import { PlayerCanvas } from './PlayerCanvas';
export const StepApp = () => {
    const { wakeLock } = useSelector(({ settings }: RootState) => settings);
    const wakeLockRef = useRef<any>();

    useEffect(() => {
        if ('wakeLock' in navigator) {
            if (wakeLock) {
                (navigator as any).wakeLock
                    .request('screen')
                    .then((resp: any) => {
                        wakeLockRef.current = resp;
                    });
            }
        } else {
            console.log('wakeLock not supported');
        }
        return () => {
            if ('wakeLock' in navigator) {
                wakeLockRef.current?.release().then(() => {
                    wakeLockRef.current = null;
                });
            }
        };
    }, []);

    return (
        <BackgroundPanel>
            <Counter />
            <PlayerCanvas />
        </BackgroundPanel>
    );
};

const BackgroundPanel = styled.div({
    backgroundColor: 'black',
    height: '90vh',
    maxHeight: '90vh',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
});
