import styled from 'styled-components';

const Text = styled.span<{
  color?: string;
  weight?: string;
  fontSize?: string;
  align?: string;
  firstToUpperCase?: boolean;
}>`
  color: ${({ color }) => color || '#FFFFFF'};
  display: block;
  font-size: ${({ fontSize }) => fontSize || '12px'};
  text-align: ${({ align }) => align || 'left'};

  ${({ firstToUpperCase }) =>
    firstToUpperCase &&
    `
  &:first-letter {
    text-transform: uppercase;
  }
  `}
  @media (min-width: 768px) {
    font-size: ${({ fontSize }) => fontSize || '15px'};
  }
  @media (min-width: 1024px) {
    font-size: ${({ fontSize }) => fontSize || '17px'};
  }
  @media (min-width: 1440px) {
    font-size: ${({ fontSize }) => fontSize || '19px'};
  }
`;

export default Text;
