import React, { createRef, useEffect, useRef } from 'react';
import run from './images/Run.png';
import Fipps from './font/Fipps-Regular.otf';
import './App.css';
//import { addToStepHook } from './stepCounter';

import styled from '@emotion/styled';
import { css, Global } from '@emotion/react';
import { Counter } from './Counter';

const Run = new Image();
Run.src = run;
function App() {
    const canvasRef = createRef<HTMLCanvasElement>();
    const canvasContext = useRef<CanvasRenderingContext2D>();

    useEffect(() => {
        canvasContext.current = canvasRef.current!.getContext(
            '2d'
        ) as CanvasRenderingContext2D;
    }, []);

    useEffect(() => {
        let i = 0;
        const intl = setInterval(() => {
            console.log(i);
            if (canvasRef.current) {
                canvasContext.current?.clearRect(
                    0,
                    0,
                    canvasRef.current.width,
                    canvasRef.current.height
                );
                const inc = 1120 / 8;
                canvasContext.current?.drawImage(Run, (i % 8) * -inc, 0);
                i++;
            }
        }, 100);
        return () => {
            clearInterval(intl);
        };
    });

    return (
        <div className="App">
            <header className="App-header">
                <Global
                    styles={css`
                        @font-face {
                            font-family: 'Fipps';
                            font-style: normal;
                            src: url('${Fipps}');
                        }
                    `}
                />
                <Counter />
                <PlayerCanvas ref={canvasRef} width={'140px'} />
            </header>
        </div>
    );
}

const PlayerCanvas = styled.canvas`
    border: 1px solid white;
    width: 200px;
`;

export default App;
