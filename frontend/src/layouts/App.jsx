import React from 'react';
import t from 'prop-types';
import styled from 'styled-components';

import Navbar from 'components/Navbar';
import Footer from 'components/Footer';

const Wrapper = styled.div`
  display: grid;
  grid-template-areas: 'header' 'main' 'footer';
  grid-template-rows: auto 1fr auto;

  min-height: 100vh;
`;

function App({ children, subRoutes }) {
  return (
    <Wrapper>
      <Navbar subRoutes={subRoutes} />
      {children}
      <Footer />
    </Wrapper>
  );
}

App.propTypes = {
  children: t.node.isRequired,
};

export default App;
