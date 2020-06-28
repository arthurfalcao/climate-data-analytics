import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import GlobalStyle from 'styles/global';
import Routes from 'routes';

import 'assets/plugins/nucleo/css/nucleo.css';
import 'assets/css/argon-dashboard-react.css';

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </>
  );
};

export default App;
