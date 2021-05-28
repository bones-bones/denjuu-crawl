import styled from '@emotion/styled';
import React from 'react';
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
                        rootRef.current?.requestFullscreen();
                    }}
                >
                    request fullscreen
                </DebugButton>
            </DebugCommands>
        </BackgroundPanel>
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
