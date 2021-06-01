import styled from '@emotion/styled';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useEvent from '../stepCounter/stepCounter';
import { RootState } from '../store';
import { incrementThunk, resetSteps } from './store';

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
        dispatch(incrementThunk());
    };
    const resetStepCount = () => {
        dispatch(resetSteps());
    };

    useEvent(incrementStepValue);
    return (
        <>
            <DebugButtons>
                Debug commands:
                <button onClick={incrementStepValue}>Step</button>
                <button
                    onClick={() => {
                        for (let i = 0; i < 50; i++) {
                            incrementStepValue();
                        }
                    }}
                >
                    Step (50)
                </button>
                <button onClick={resetStepCount}>Reset Steps</button>
            </DebugButtons>
            <StepValue stepVal={stepValue}>{stepValue}</StepValue>
        </>
    );
};

const DebugButtons = styled.div({
    color: 'white',
});

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
