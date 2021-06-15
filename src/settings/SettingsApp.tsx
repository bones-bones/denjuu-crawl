import styled from '@emotion/styled';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../store';
import { setVibration, setWakeLock } from './store';
export const SettingsApp = ({
    rootRef,
}: {
    rootRef: React.RefObject<HTMLDivElement>;
}) => {
    return (
        <BackgroundPanel>
            there is nothing really good here yet...
            <DebugCommands>
                <span>debug commands</span>
                <DebugButton
                    onClick={() => {
                        localStorage.removeItem('reduxState');
                        window.location.reload();
                    }}
                >
                    hard reset
                </DebugButton>
                <DebugButton
                    onClick={() => {
                        rootRef.current?.requestFullscreen({
                            navigationUI: 'hide',
                        });
                    }}
                >
                    Fullscreen
                </DebugButton>
            </DebugCommands>
            <SettingsControls />
        </BackgroundPanel>
    );
};
const SettingsControls = () => {
    const dispatch = useDispatch();
    const settings = useSelector(({ settings }: RootState) => settings);

    return (
        <>
            <label htmlFor="vibration">Enable Vibration</label>
            <input
                type="checkbox"
                id="vibration"
                checked={settings.vibration}
                onChange={() => {
                    dispatch(
                        setVibration({ vibrationSetting: !settings.vibration })
                    );
                }}
            />
            <br />
            <br />
            <br />
            <br />
            <label htmlFor="wakelock">Enable WakeLock when walking</label>
            <input
                type="checkbox"
                id="wakelock"
                checked={settings.wakeLock}
                onChange={() => {
                    dispatch(
                        setWakeLock({ wakeLockSetting: !settings.wakeLock })
                    );
                }}
            />
        </>
    );
};
const DebugCommands = styled.div({
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '50vh',
});
const DebugButton = styled.button({ height: '7vh' });
const BackgroundPanel = styled.div({
    backgroundColor: 'lightgrey',
    height: '90vh',
    maxHeight: '90vh',
    overflow: 'scroll',
});
