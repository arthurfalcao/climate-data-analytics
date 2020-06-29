import styled from 'styled-components';

export const ForecastWrapper = styled.div`
  flex-shrink: 0;
  flex-basis: 90px;
  padding: 10px;
  margin: 0 5px;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.2);
  &:first-child {
    margin-left: 0;
  }
  &:last-child {
    margin-right: 0;
  }
  @media (min-width: 768px) {
    flex-basis: 110px;
  }
  @media (min-width: 1024px) {
    flex-basis: 125px;
  }
  @media (min-width: 1440px) {
    flex-basis: 140px;
  }
`;

export const WeatherIcon = styled.img`
  display: block;
  height: 50px;
  width: 50px;
  margin: 0 auto;
`;
