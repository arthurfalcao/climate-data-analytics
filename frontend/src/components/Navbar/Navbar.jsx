import React, { useState } from 'react';
import t from 'prop-types';
import { Link } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem } from 'reactstrap';

import * as S from './styled';

const routes = [
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

function CustomNavbar({ subRoutes }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <nav>
      <Navbar dark expand="md" className="w-100">
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
      </Navbar>

      {subRoutes && (
        <Navbar dark expand="md" className="w-100 py-0">
          <Collapse isOpen={isOpen} navbar>
            <Nav navbar>
              {subRoutes.map((route) => (
                <NavItem key={route.url}>
                  <S.NavLink to={route.url}>{route.title}</S.NavLink>
                </NavItem>
              ))}
            </Nav>
          </Collapse>
        </Navbar>
      )}
    </nav>
  );
}

CustomNavbar.defaultProps = {
  subRoutes: null,
};

CustomNavbar.propTypes = {
  subRoutes: t.array,
};

export default CustomNavbar;
