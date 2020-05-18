import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Auth from 'layouts/Auth';
import Admin from 'layouts/Admin';
import Dashboard from 'pages/Dashboard';
import Profile from 'pages/Profile';
import Login from 'pages/Login';
import Register from 'pages/Register';
import Home from 'pages/Home';

function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Admin>
          <Dashboard />
        </Admin>
      </Route>

      <Route path="/weather">
        <Home />
      </Route>

      <Route path="/profile">
        <Admin>
          <Profile />
        </Admin>
      </Route>

      <Route path="/login">
        <Auth>
          <Login />
        </Auth>
      </Route>

      <Route path="/register">
        <Auth>
          <Register />
        </Auth>
      </Route>
    </Switch>
  );
}

export default Routes;
