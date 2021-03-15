import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { addToStepHook } from './stepCounter';

import styled from '@emotion/styled';
import useEvent from './stepCounter/stepCounter';

function App() {
  const [stepValue, setStepValue] = useState<number>(0)

  const incrementStepValue = () => {
    setStepValue(stepValue + 1);
  }
  useEvent(incrementStepValue)

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <StepValue stepVal={stepValue}>{stepValue}</StepValue>
        </p>

      </header>
    </div>
  );
}

const StepValue = styled.div<{ stepVal: number }>`
height:50vh;
width:50vw;
background-color: ${({ stepVal }) => {
    if (stepVal > 0.3) {
      return 'GREEN';
    }
    if (stepVal < -0.3) { return 'RED' }
    return 'GREY';
  }};
`


export default App;
