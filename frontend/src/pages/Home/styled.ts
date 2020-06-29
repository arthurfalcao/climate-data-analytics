import styled from 'styled-components';

import bg from 'assets/2850815.jpg';

export const Content = styled.div`
  background: url(${bg});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  width: 100%;
  padding: 1em;
`;
