import styled from 'styled-components';
import { NavLink as CustomNavLink, Link } from 'react-router-dom';
import bg from 'assets/2850815.jpg';

export const Wrapper = styled.div`
  display: grid;
  grid-template-areas: 'header' 'main' 'footer';
  grid-template-rows: auto 1fr auto;
  grid-gap: 16px;

  min-height: 100vh;
  /* margin: 0 15px; */
  position: relative;

  &:before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-image: url(${bg});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  width: 100%;
  padding: 1em;
`;

export const AppTitle = styled.h1`
  display: block;
  height: 64px;
  margin: 0;
  padding: 20px 0;
  font-size: 20px;
  text-transform: uppercase;
  font-weight: 400;
  color: #ffffff;
  transition: 0.3s 1.4s;
  opacity: ${({ showLabel }) => (showLabel ? 1 : 0)};

  ${({ secondary }) =>
    secondary &&
    `
    opacity: 1;
    height: auto;
    position: relative;
    padding: 20px 0;
    font-size: 30px;
    top: 20%;
    text-align: center;
    transition: .5s;
    @media (min-width: 768px) {
      font-size: 40px;
    }
    @media (min-width: 1024px) {
      font-size: 50px;
    }
    @media (min-width: 1440px) {
      font-size: 60px;
    }
    @media (min-width: 2560px) {
      font-size: 70px;
    }
  `}

  ${({ showResult }) =>
    showResult &&
    `
    opacity: 0;
    visibility: hidden;
    top: 10%;
  `}
`;

export const WeatherWrapper = styled.div`
  max-width: 1500px;
  margin: 0 auto;
  height: calc(100vh - 64px);
  width: 100%;
  position: relative;
`;

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

export const FooterWrapper = styled.footer`
  display: flex;
  width: 100%;
  padding: 1rem;
  z-index: 1100;
`;

export const FooterTextWrapper = styled.div`
  flex-grow: 1;
`;

export const FooterText = styled.p`
  color: #fff;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.57;
  margin: 0;
  text-align: right;
`;

export const FooterLinks = styled.ul`
  align-items: center;
  display: flex;
  justify-content: space-around;
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const FooterLinkItem = styled.li`
  &:not(:last-child) {
    margin-right: 16px;
  }
`;

export const FooterLink = styled(Link)`
  color: #fff;

  &:hover {
    color: #b3b3b3;
  }
`;
