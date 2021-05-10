import React from 'react';
import Fipps from './font/Fipps-Regular.otf';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
//import { addToStepHook } from './stepCounter';

import { css, Global } from '@emotion/react';
import { StepApp } from './StepApp';
import { BattleApp } from './battle/BattleApp';
import styled from '@emotion/styled';
import { AlertView } from './alerts';
import { ContactList } from './contacts';

function App() {
  //const activeFunction = useSelector(({ application: { activeFunction } }: RootState) => activeFunction);

  const navItems = [
    { title: 'Walk', path: '' },
    { title: 'Alerts', path: '/alerts' },
    { title: 'Denju', path: '/contacts' },
    { title: 'Items', path: '' },
    {
      title: 'Settings',
      path: '',
    },
  ];
  return (
    <div
      className="App"
      style={{
        backgroundColor: 'black',
      }}
    >
      <Router>
        <Header>
          {navItems.map(({ title, path }) => (
            <Link to={path} key={title}>
              <NavItem key={title}>{title[0]}</NavItem>
            </Link>
          ))}
        </Header>
        <Global
          styles={css`
                        @font-face {
                            font-family: 'Fipps';
                            font-style: normal;
                            src: url('${Fipps}');
                        }
                    `}
        />
        <Switch>
          <Route path="/battle">
            <BattleApp />
          </Route>
          <Route path="/alerts">
            <AlertView />
          </Route>
          <Route path="/contacts">
            <ContactList />
          </Route>
          <Route path="/">
            <StepApp />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

const NavItem = styled.button({
  display: 'inline-flex',
  height: '10vh',
  width: '20vw',
  color: 'white',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'black',
});

const Header = styled.header({ height: '10vh' });
export default App;
