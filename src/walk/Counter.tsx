import styled from '@emotion/styled';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useEvent from '../stepCounter/stepCounter';
import { RootState, incremented } from '../store';

export const Counter = () => {
    const dispatch = useDispatch();

    const stepValue = useSelector(
        ({
            counter: {
                step: { value },
            },
        }: RootState) => value
    );

    const incrementStepValue = () => {
        dispatch(incremented());
    };

    useEvent(incrementStepValue);
    return (
        <>
            <button onClick={incrementStepValue}>Step</button>
            <StepValue stepVal={stepValue}>{stepValue}</StepValue>
        </>
    );
};

const StepValue = styled.div<{ stepVal: number }>`
    height: 50px;
    width: 60vw;
    font-family: Fipps;
    display: flex;
    justify-content: center;
    align-items: center;
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