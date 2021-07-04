import React from 'react';

import { BorderedContainer } from '../components';
import { Popup } from './Popup';
import { Props } from './types';

export const BorderedPopup = ({ closeCallback, children }: Props) => (
    <Popup closeCallback={closeCallback}>
        <BorderedContainer>{children}</BorderedContainer>
    </Popup>
);
