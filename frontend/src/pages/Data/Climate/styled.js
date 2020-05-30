import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Wrapper = styled.main`
  display: grid;
  grid-template-areas: 'sidebar main';
  grid-template-columns: 1fr 4fr;
  grid-gap: 8px;
  position: relative;
`;

export const SidebarWrapper = styled.aside`
  border-right: 1px solid #ffffff;
  height: 100%;
  width: 100%;
`;

export const SibebarNavLink = styled(NavLink).attrs({
  className: 'nav-link',
  activeClassName: 'active',
})`
  && {
    color: #ffffff;
    display: flex;
    font-size: 9pt;
    font-weight: 600;
    padding: 0.5rem 1rem;
    margin: 0 1rem;

    &:hover {
      color: inherit;
      text-decoration: none;
    }

    &.active {
      background: #b3b3b3;
    }
  }
`;
