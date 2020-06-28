import styled from 'styled-components';

export const Wrapper = styled.main`
  display: grid;
  grid-template: 'sidebar main' / 1fr 4fr;
  grid-gap: 8px;
  position: relative;

  @media (min-width: 992px) {
    grid-template: 'sidebar main' / 1fr 6fr;
  }
`;
