import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Layout from 'layouts/App';

import Climate from './Climate';

const subRoutes = [
  {
    title: 'Clima',
    url: '/dados/clima',
  },
  {
    title: 'Download',
    url: '/dados/download',
  },
  {
    title: 'Comparação',
    url: '/dados/comparacao',
  },
  {
    title: 'Estações',
    url: '/dados/estacoes',
  },
  {
    title: 'Ajuda',
    url: '/dados/ajuda',
  },
];

const Data: React.FC = () => {
  return (
    <Layout subRoutes={subRoutes}>
      <Switch>
        <Route path="/dados/clima" component={Climate} />
        <Redirect from="*" to="/dados/clima" />
      </Switch>
    </Layout>
  );
};

export default Data;
