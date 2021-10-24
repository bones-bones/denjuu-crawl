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
                        closeCallback?.();
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
    zIndex: popupcounthack + 5 + 2,
    borderRadius: '15px 0px 0px 0px',
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
    zIndex: popupcounthack + 5,
    width: '96vw',
    padding: '2vw',

    top: 0,
    left: 0,
    background: 'rgba(0, 0, 0, .5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
});
