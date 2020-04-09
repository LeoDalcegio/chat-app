import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './pages/Login'
import Chat from './pages/Chat'

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Login}/>
                <Route path='/chat' exact component={Chat}/>
            </Switch>
        </BrowserRouter>
    );
}
