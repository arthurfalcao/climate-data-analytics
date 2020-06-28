import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const SidebarWrapper = styled.aside`
  background: var(--dark-color);
  grid-area: sidebar;
  height: 100%;
`;

export const SibebarNavLink = styled(NavLink).attrs({
  className: 'nav-link',
  activeClassName: 'active',
})`
  && {
    color: var(--white);
    font-size: 9pt;
    font-weight: 600;
    padding: 0.75rem 1rem;
    transition: 0.4s;

    &:hover,
    &.active {
      background: var(--primary-color);
      color: var(--white);
    }
  }
`;
