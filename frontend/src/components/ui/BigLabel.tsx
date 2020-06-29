import styled from 'styled-components';

const BigLabel = styled.h2<{
  color?: string;
  weight?: string;
  fontSize?: string;
  align?: string;
  firstToUpperCase?: boolean;
}>`
  color: ${({ color }) => color || '#FFFFFF'};
  display: block;
  font-weight: ${({ weight }) => weight || '600'};
  font-size: ${({ fontSize }) => fontSize || '30px'};
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
    font-size: ${({ fontSize }) => fontSize || '37px'};
  }
  @media (min-width: 1024px) {
    font-size: ${({ fontSize }) => fontSize || '43px'};
  }
  @media (min-width: 1440px) {
    font-size: ${({ fontSize }) => fontSize || '52px'};
  }
`;

export default BigLabel;
