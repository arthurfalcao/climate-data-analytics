import styled from 'styled-components';
import { NavLink as CustomNavLink } from 'react-router-dom';

export const NavLink = styled(CustomNavLink).attrs({
  className: 'nav-link',
  activeClassName: 'selected',
})`
  cursor: pointer;
  font-weight: 600;

  &.selected {
    background: #b3b3b3;
  }
`;
