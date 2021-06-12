import styled from '@emotion/styled';
import React from 'react';

import { Props } from './types';

// here is a huge hack but whatever
let popupcounthack = 2;

export const Popup = ({ closeCallback, children }: Props) => {
    popupcounthack++;
    return (
        <PopupContainer>
            <MessageBackground>
                <DismissButton
                    onClick={() => {
                        popupcounthack--;
                        if (closeCallback) {
                            closeCallback();
                        }
                    }}
                >
                    X
                </DismissButton>
                {children}
            </MessageBackground>
        </PopupContainer>
    );
};

const DismissButton = styled.button({
    position: 'absolute',
    zIndex: popupcounthack,
});
const MessageBackground = styled.div({
    margin: '5px',
    opacity: 1,
    alignItems: 'flex-start',
    display: 'flex',
    position: 'relative',
});
const PopupContainer = styled.div({
    position: 'fixed',
    height: '100vh',
    width: '96vw',
    padding: '2vw',
    zIndex: 5,
    top: 0,
    left: 0,
    background: 'rgba(0, 0, 0, .5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
});
