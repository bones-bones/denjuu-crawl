//import { addToStepHook } from './stepCounter';
import { css, Global } from '@emotion/react';
import styled from '@emotion/styled';
import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

import { AlertView } from './alerts';
import { name as alertsName } from './alerts';
import { BattleApp } from './battle/BattleApp';
import { ContactList } from './contacts';
import Fipps from './font/Fipps-Regular.otf';
import DMode from './images/menuIcons/d_mode.gif';
import Items from './images/menuIcons/items.gif';
import Mail from './images/menuIcons/mail.gif';
import OptionsIcon from './images/menuIcons/options.gif';
import PhoneBook from './images/menuIcons/phone_book.gif';
import { InventoryView } from './inventory';
import { SettingsApp } from './settings';
import { RootState } from './store';
import { StepApp } from './walk/StepApp';

function App() {
    //const activeFunction = useSelector(({ application: { activeFunction } }: RootState) => activeFunction);
    const rootRef = useRef<HTMLDivElement>(null);
    const alerts = useSelector(
        ({ [alertsName]: { events } }: RootState) => events
    );
        const brevPath='/absproxy/3000';
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
                        <NavItem key={'Walk'}>
                            <img src={DMode} />
                        </NavItem>
                    </Link>
                    <Link to={'alerts'} key={'Alerts'}>
                        <NavItem key={'Alerts'}>
                            <img src={Mail} />
                            <AlertNumber>
                                {alerts.length > 0 && `(${alerts.length})`}
                            </AlertNumber>
                        </NavItem>
                    </Link>
                    <Link to="contacts" key="contacts">
                        <NavItem key="contacts">
                            <img src={PhoneBook} />
                        </NavItem>
                    </Link>
                    <Link to="items" key="items">
                        <NavItem key="items">
                            <img src={Items} />
                        </NavItem>
                    </Link>
                    <Link to="settings" key="settings">
                        <NavItem key="settings">
                            <img src={OptionsIcon} />
                        </NavItem>
                    </Link>
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
                    <Route path={brevPath+"/denjuu-crawl/battle"}>
                        <BattleApp />
                    </Route>
                    <Route path={brevPath+"/denjuu-crawl/alerts"}>
                        <AlertView />
                    </Route>
                    <Route path={brevPath+"/denjuu-crawl/contacts"}>
                        <ContactList />
                    </Route>
                    <Route path={brevPath+"/denjuu-crawl/items"}>
                        <InventoryView />
                    </Route>
                    <Route path={brevPath+"/denjuu-crawl/settings"}>
                        <SettingsApp rootRef={rootRef} />
                    </Route>
                    <Route path={brevPath+"/denjuu-crawl/walk"}>
                        <StepApp />
                    </Route>
                    <Route path={brevPath+"/denjuu-crawl/"}>
                        <StepApp />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

const AlertNumber = styled.span({
    position: 'absolute',
    top: '3vh',
    right: '2px',
});
const NavItem = styled.button({
    display: 'inline-flex',
    height: '10vh',
    width: '20vw',
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    position: 'relative',
});

const Header = styled.header({ height: '10vh' });
export default App;
