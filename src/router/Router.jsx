import React from 'react';

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import CreateTeam from '../screens/CreateTeam';
import Teams from '../screens/Teams';

const Router = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/teams" component={Teams}  />
                <Route path="/createteam" component={CreateTeam} />
                <Redirect to="/teams" />
            </Switch>
        </BrowserRouter>
    );
}

export default Router;