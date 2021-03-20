import React from 'react';
import Fipps from './font/Fipps-Regular.otf';
import './App.css';
//import { addToStepHook } from './stepCounter';

import { css, Global } from '@emotion/react';
import { Counter } from './Counter';
import { PlayerCanvas } from './PlayerCanvas';

function App() {
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
        <PlayerCanvas />
      </header>
    </div>
  );
}

export default App;
