import styled from 'styled-components';

const SmallLabel = styled.h4`
  color: ${({ color }) => color || '#FFFFFF'};
  display: block;
  font-weight: ${({ weight }) => weight || '600'};
  font-size: ${({ fontSize }) => fontSize || '15px'};
  text-align: ${({ align }) => align || 'left'};
  padding: 5px 0;
  ${({ firstToUpperCase }) =>
    firstToUpperCase &&
    `
  &:first-letter {
    text-transform: uppercase;
  }
  `}
  @media (min-width: 768px) {
    font-size: ${({ fontSize }) => fontSize || '20px'};
  }
  @media (min-width: 1024px) {
    font-size: ${({ fontSize }) => fontSize || '23px'};
  }
  @media (min-width: 1440px) {
    font-size: ${({ fontSize }) => fontSize || '26px'};
  }
`;

export default SmallLabel;
