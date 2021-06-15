import styled from '@emotion/styled';
import React from 'react';

import { Popup } from './Popup';
import { Props } from './types';

export const BorderedPopup = ({ closeCallback, children }: Props) => (
    <Popup closeCallback={closeCallback}>
        <Container>{children}</Container>
    </Popup>
);

const Container = styled.div({
    backgroundColor: 'rgba(0, 0, 0, 1)',
    borderRadius: '15px',
    borderTop: '2vw groove',
    borderLeft: '2vw groove',
    borderBottom: '0.5vh groove',
    borderRight: '1vw groove',
    overflow: 'hidden',
});
