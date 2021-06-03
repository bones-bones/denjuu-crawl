//import { addToStepHook } from './stepCounter';
import { css, Global } from '@emotion/react';
import styled from '@emotion/styled';
import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

import { AlertView } from './alerts';
import { BattleApp } from './battle/BattleApp';
import { ContactList } from './contacts';
import Fipps from './font/Fipps-Regular.otf';
import { ItemView } from './items';
import { SettingsApp } from './settings';
import { RootState } from './store';
import { StepApp } from './walk/StepApp';

function App() {
    //const activeFunction = useSelector(({ application: { activeFunction } }: RootState) => activeFunction);
    const rootRef = useRef<HTMLDivElement>(null);
    const alerts = useSelector(({ events: { events } }: RootState) => events);

    const navItems = [
        { title: 'Denju', path: 'contacts' },
        { title: 'Items', path: 'items' },
        {
            title: 'Settings',
            path: 'settings',
        },
    ];
    return (
        <div
            ref={rootRef}
            className="App"
            style={{
                backgroundColor: 'black',
            }}
        >
            <Router>
                <Header>
                    <Link to={'walk'} key={'Walk'}>
                        <NavItem key={'Walk'}>{'Walk'[0]}</NavItem>
                    </Link>
                    <Link to={'alerts'} key={'Alerts'}>
                        <NavItem key={'Alerts'}>
                            {'Alerts'[0]}
                            {alerts.length > 0 && `(${alerts.length})`}
                        </NavItem>
                    </Link>
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
                    <Route path="/denjuu-crawl/battle">
                        <BattleApp />
                    </Route>
                    <Route path="/denjuu-crawl/alerts">
                        <AlertView />
                    </Route>
                    <Route path="/denjuu-crawl/contacts">
                        <ContactList />
                    </Route>
                    <Route path="/denjuu-crawl/items">
                        <ItemView />
                    </Route>
                    <Route path="/denjuu-crawl/settings">
                        <SettingsApp rootRef={rootRef} />
                    </Route>
                    <Route path="/denjuu-crawl/walk">
                        <StepApp />
                    </Route>
                    <Route path="/denjuu-crawl/">
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
