import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem } from 'reactstrap';

import * as S from './styled';

const routes = [
  {
    title: 'Inicio',
    url: '/',
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

function CustomNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar dark expand="md">
      <Link to="/" className="navbar-brand">
        INAMET
      </Link>
      <NavbarToggler onClick={toggle} />

      <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto" navbar>
          {routes.map((route) => (
            <NavItem key={route.url}>
              <S.NavLink to={route.url}>{route.title}</S.NavLink>
            </NavItem>
          ))}
        </Nav>
      </Collapse>
    </Navbar>
  );
}

export default CustomNavbar;
