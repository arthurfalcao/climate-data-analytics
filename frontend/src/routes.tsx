import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';

const Home = lazy(() => import('pages/Home'));
const Data = lazy(() => import('pages/Data'));
const News = lazy(() => import('pages/News'));
const Project = lazy(() => import('pages/Project'));

const Routes: React.FC = () => {
  return (
    <Suspense fallback="Loading...">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/dados" component={Data} />

        <Route path="/noticias" component={News} />
        <Route path="/projeto" component={Project} />
      </Switch>
    </Suspense>
  );
};

export default Routes;
