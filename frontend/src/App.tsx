import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import GlobalStyle from 'styles/global';
import Routes from 'routes';

import 'bootstrap/dist/css/bootstrap.css';

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
