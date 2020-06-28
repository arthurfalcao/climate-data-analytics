import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Collapse, NavbarToggler, Nav, NavItem } from 'reactstrap';

import * as S from './styled';

const routes: Route[] = [
  {
    title: 'Inicio',
    url: '/',
    exact: true,
  },
  {
    title: 'Dados',
    url: '/dados',
  },
  {
    title: 'Noticias',
    url: '/noticias',
  },
  {
    title: 'Projeto',
    url: '/projeto',
  },
];

export type Route = {
  title: string;
  url: string;
  exact?: boolean;
};

type Props = {
  subRoutes?: Route[];
};

const Navbar: React.FC<Props> = ({ subRoutes }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <header>
      <S.Navbar>
        <Link to="/" className="navbar-brand">
          INAMET
        </Link>
        <NavbarToggler onClick={toggle} />

        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            {routes.map((route) => (
              <NavItem key={route.url}>
                <S.NavLink {...route} to={route.url}>
                  {route.title}
                </S.NavLink>
              </NavItem>
            ))}
          </Nav>
        </Collapse>
      </S.Navbar>

      {subRoutes && (
        <S.MainNavbar>
          <Collapse isOpen={isOpen} navbar>
            <Nav navbar>
              {subRoutes.map((route) => (
                <NavItem key={route.url}>
                  <S.MainNavLink to={route.url}>{route.title}</S.MainNavLink>
                </NavItem>
              ))}
            </Nav>
          </Collapse>
        </S.MainNavbar>
      )}
    </header>
  );
};

export default Navbar;
