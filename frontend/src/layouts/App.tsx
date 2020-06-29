import React from 'react';
import styled from 'styled-components';

import Navbar from 'components/Navbar';
import { Route } from 'components/Navbar/Navbar';
import Footer from 'components/Footer';

const Wrapper = styled.div`
  background: var(--white);
  display: grid;
  grid-template-areas: 'header' 'main' 'footer';
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
`;

type Props = {
  subRoutes?: Route[];
};

const App: React.FC<Props> = ({ children, subRoutes }: Props) => {
  return (
    <Wrapper>
      <Navbar subRoutes={subRoutes} />
      {children}
      <Footer />
    </Wrapper>
  );
};

export default App;
