import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Routes from './routes';

import 'assets/plugins/nucleo/css/nucleo.css';
import 'assets/css/argon-dashboard-react.css';

function App() {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
}

export default App;
