import styled from 'styled-components';
import { NavLink as CustomNavLink } from 'react-router-dom';
import { Navbar as BNavBar } from 'reactstrap';

export const Navbar = styled(BNavBar).attrs({
  expand: 'md',
})`
  background-color: var(--white);
  width: 100%;
`;

export const NavLink = styled(CustomNavLink).attrs({
  className: 'nav-link',
  activeClassName: 'selected',
})`
  color: var(--gray);
  cursor: pointer;
  font-weight: 600;
  transition: 0.4s;

  &:hover,
  &.selected {
    background: var(--primary-color);
    color: var(--white);
  }
`;

export const MainNavbar = styled(BNavBar).attrs({
  expand: 'md',
})`
  background: var(--dark-color);
  padding: 0;
  width: 100%;
`;

export const MainNavLink = styled(NavLink)`
  color: var(--white);
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
`;
