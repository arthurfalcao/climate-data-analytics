import React from 'react';
import { NavItem, Nav } from 'reactstrap';

import * as S from './styled';

const subRoutes = [
  {
    title: 'Histórico Simulado',
    url: '/dados/clima',
  },
  {
    title: 'Média temporal',
    url: '/dados/download',
  },
  {
    title: 'Média Temperatura',
    url: '/dados/comparacao',
  },
  {
    title: 'Estatística',
    url: '/dados/estacoes',
  },
];

const Sidebar: React.FC = () => {
  return (
    <S.SidebarWrapper>
      <Nav navbar className="align-items-start">
        {subRoutes.map((route) => (
          <NavItem key={route.url} className="w-100">
            <S.SibebarNavLink {...route} to={route.url}>
              {route.title}
            </S.SibebarNavLink>
          </NavItem>
        ))}
      </Nav>
    </S.SidebarWrapper>
  );
};

export default Sidebar;
