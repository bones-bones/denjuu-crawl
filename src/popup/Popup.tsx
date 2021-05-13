import styled from '@emotion/styled';
import React from 'react';

interface Props {
    closeCallback?: () => void
    children: React.ReactNode

}

export const Popup = ({ closeCallback, children }: Props) => {

    return <PopupContainer>

        <MessageBackground><DismissButton onClick={closeCallback}>X</DismissButton>{children}</MessageBackground>
    </PopupContainer>
}


const DismissButton = styled.button({ position: 'absolute', zIndex: 6 })
const MessageBackground = styled.div({
    margin: '5px',


    opacity: 1,
    alignItems: 'flex-start', display: 'flex'
})
const PopupContainer = styled.div(
    {
        position: 'fixed',
        height: '100vh',
        width: '100vw',
        padding: '2vw',
        zIndex: 5,
        top: 0, left: 0,
        background: 'rgba(0, 0, 0, .5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'

    }
)