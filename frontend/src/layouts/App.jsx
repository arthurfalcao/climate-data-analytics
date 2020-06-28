import React from 'react';
import t from 'prop-types';
import styled from 'styled-components';

import Navbar from 'components/Navbar';
import Footer from 'components/Footer';

import bg from 'assets/2850815.jpg';

const Wrapper = styled.div`
  display: grid;
  grid-template-areas: 'header' 'main' 'footer';
  grid-template-rows: auto 1fr auto;

  min-height: 100vh;
  position: relative;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-image: url(${bg});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }
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
