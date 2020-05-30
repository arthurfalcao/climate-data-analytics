import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';

const Auth = lazy(() => import('layouts/Auth'));
const Admin = lazy(() => import('layouts/Admin'));
const Dashboard = lazy(() => import('pages/Dashboard'));
const Profile = lazy(() => import('pages/Profile'));
const Login = lazy(() => import('pages/Login'));
const Register = lazy(() => import('pages/Register'));
const Home = lazy(() => import('pages/Home'));
const Data = lazy(() => import('pages/Data'));

function Routes() {
  return (
    <Suspense fallback="Loading...">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/dados" component={Data} />

        <Route path="/weather">
          <Admin>
            <Dashboard />
          </Admin>
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
    </Suspense>
  );
}

export default Routes;
