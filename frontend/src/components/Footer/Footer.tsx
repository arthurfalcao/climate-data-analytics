import React from 'react';

import * as S from './styled';

const footerRoutes = [
  {
    title: 'Contato',
    url: '/contato',
  },
  {
    title: 'Ajuda',
    url: '/ajuda',
  },
  {
    title: 'Links',
    url: '/links',
  },
  {
    title: 'Avisos',
    url: '/avisos',
  },
  {
    title: 'Ficha ténica',
    url: '/ficha-tecnica',
  },
];

const Footer: React.FC = () => {
  return (
    <S.FooterWrapper>
      <S.FooterLinks>
        {footerRoutes.map((route) => (
          <S.FooterLinkItem key={route.url}>
            <S.FooterLink to={route.url}>{route.title}</S.FooterLink>
          </S.FooterLinkItem>
        ))}
      </S.FooterLinks>

      <S.FooterTextWrapper>
        <S.FooterText>2020 INAMET - Instituto Nacional de Meteorologia e Geofísica</S.FooterText>
      </S.FooterTextWrapper>
    </S.FooterWrapper>
  );
}

export default Footer;
