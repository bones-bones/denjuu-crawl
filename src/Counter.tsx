import styled from '@emotion/styled';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useEvent from './stepCounter/stepCounter';
import { AppState, incremented } from './store';

export const Counter = () => {
    const dispatch = useDispatch();

    const stepValue = useSelector(({ step: { value } }: AppState) => value);

    const incrementStepValue = () => {
        dispatch(incremented());
    };

    useEvent(incrementStepValue);
    return <StepValue stepVal={stepValue}>{stepValue}</StepValue>;
};

const StepValue = styled.div<{ stepVal: number }>`
    height: 50px;
    width: 50vw;
    font-family: Fipps;
    background-color: ${({ stepVal }) => {
        if (stepVal > 0.3) {
            return 'GREEN';
        }
        if (stepVal < -0.3) {
            return 'RED';
        }
        return 'GREY';
    }};
`;
