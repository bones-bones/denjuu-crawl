import React, { createRef, useEffect, useRef, useState } from 'react';
import run from './images/Run.png';
import Fipps from './font/Fipps-Regular.otf'
import './App.css';
//import { addToStepHook } from './stepCounter';

import styled from '@emotion/styled';
import useEvent from './stepCounter/stepCounter';
import { css, Global } from '@emotion/react';

const Run = new Image();
Run.src = run;
function App() {
  const [stepValue, setStepValue] = useState<number>(0);
  const canvasRef = createRef<HTMLCanvasElement>();
  const canvasContext = useRef<CanvasRenderingContext2D>();

  const incrementStepValue = () => {
    if (canvasRef.current) {
      canvasContext.current?.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
      const inc = 1120 / 8;
      canvasContext.current?.drawImage(
        Run,
        (stepValue % 8) * -inc,
        stepValue
      );
    }
    setStepValue(stepValue + 1);
  };
  useEvent(incrementStepValue);
  useEffect(() => {
    canvasContext.current = canvasRef.current!.getContext(
      '2d'
    ) as CanvasRenderingContext2D;
  }, []);
  console.log(Fipps)
  return (
    <div className="App">
      <header className="App-header">
        <Global styles={css`
          @font-face {
            font-family: "Fipps";
            font-style: normal;
            src: url("${Fipps}");
          }`} />
        <StepValue stepVal={stepValue}>{stepValue}</StepValue>
        <PlayerCanvas ref={canvasRef} width={'140px'} />
      </header>
    </div>
  );
}

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
const PlayerCanvas = styled.canvas`
    border: 1px solid white;
    width: 200px;  
`;

export default App;
