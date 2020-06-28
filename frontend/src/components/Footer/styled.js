import styled from 'styled-components';
import { Link } from 'react-router-dom';

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
  color: var(--gray);
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
  color: var(--gray);

  &:hover {
    color: var(--gray);
    opacity: 0.7;
  }
`;
