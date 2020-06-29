import styled from 'styled-components';

export const Wrapper = styled.main`
  display: grid;
  grid-template-areas:
    'sidebar graph1 map'
    'sidebar graph2 map';
  grid-template-columns: 1fr 2fr 2fr;
  grid-template-rows: 50% 50%;
  grid-column-gap: 1rem;

  @media (min-width: 992px) {
    grid-template-columns: 1fr 3fr 3fr;
  }
`;

export const GraphWrapper = styled.div`
  background: linear-gradient(87deg, #172b4d 0, #1a174d 100%);
  box-shadow: 0 0 2rem 0 rgba(136, 152, 170, 0.15);
  border-radius: 0.375rem;
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
`;

export const GraphHeader = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 1rem;
`;

export const GraphContent = styled.div`
  flex: 1 1 auto;
  padding: 0 1rem 1rem;
`;

export const GraphDescription = styled.h6`
  color: #ced4da;
  font-size: 0.625rem;
  letter-spacing: 0.0625rem;
  margin-bottom: 0.25rem;
  text-transform: uppercase;
`;

export const GraphTitle = styled.h2`
  color: var(--white);
  font-size: 1.25rem;
  margin-bottom: 0;
`;
