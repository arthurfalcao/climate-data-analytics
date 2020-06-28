import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Layout from 'layouts/App';

import Summary from './Summary';

const subRoutes = [
  {
    title: 'Súmario',
    url: '/projeto/sumario',
  },
  {
    title: 'Download',
    url: '/projeto/metodologia',
  },
  {
    title: 'Comparação',
    url: '/projeto/glossario',
  },
  {
    title: 'Estações',
    url: '/projeto/publicacoes',
  },
  {
    title: 'Ajuda',
    url: '/projeto/faq',
  },
];

function Project() {
  return (
    <Layout subRoutes={subRoutes}>
      <Switch>
        <Route path="/projeto/sumario" component={Summary} />
        <Redirect from="*" to="/projeto/sumario" />
      </Switch>
    </Layout>
  )
}

export default Project;
