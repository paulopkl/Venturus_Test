import React from 'react';

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import CreateTeam from '../screens/CreateTeam';
import EditTeam from '../screens/EditTeam';
import Teams from '../screens/Teams';
import LogIn from '../screens/LogIn';
import Register from '../screens/Register';

const Router = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/teams" component={Teams} />
                <Route path="/login" component={LogIn} />
                <Route path="/register" component={Register} />
                <Route path="/create/team" component={CreateTeam} />
                <Route path="/edit/team/:id" component={EditTeam} />
                <Redirect to="/teams" />
            </Switch>
        </BrowserRouter>
    );
}

export default Router;