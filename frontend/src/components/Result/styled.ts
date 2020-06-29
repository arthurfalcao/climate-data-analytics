import styled from 'styled-components';
import ResultFadeIn from 'components/ui/ResultFadeIn';

export const Results = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 40px 0;
  opacity: 0;
  visibility: hidden;
  position: relative;
  top: 20px;
  animation: ${ResultFadeIn} 0.5s 1.4s forwards;
`;

export const LocationWrapper = styled.div`
  flex-basis: 100%;
`;

export const CurrentWeatherWrapper = styled.div`
  flex-basis: 100%;
  display: grid;
  justify-content: center;
  align-items: center;
  grid-template-columns: auto 1fr;
  margin: 20px 0;
  grid-gap: 30px;
  @media (min-width: 525px) {
    flex-basis: 50%;
    padding-right: 10px;
  }
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    padding-right: 20px;
  }
`;

export const WeatherIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 70px;
  color: var(--white);
  @media (min-width: 768px) {
    font-size: 100px;
    justify-content: flex-end;
  }
  @media (min-width: 1024px) {
    font-size: 120px;
  }
  @media (min-width: 1440px) {
    font-size: 140px;
  }
`;

export const TemperatureWrapper = styled.div``;

export const Temperature = styled.h3`
  display: block;
  font-size: 50px;
  font-weight: 400;
  color: var(--white);
  @media (min-width: 768px) {
    font-size: 70px;
  }
  @media (min-width: 1024px) {
    font-size: 90px;
  }
  @media (min-width: 1440px) {
    font-size: 110px;
  }
`;

export const WeatherDetailsWrapper = styled.div`
  flex-basis: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 10px 0;
  margin: 20px 0;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  align-self: flex-start;
  @media (min-width: 525px) {
    flex-basis: 50%;
  }
`;

export const WeatherDetail = styled.div`
  flex-basis: calc(100% / 3);
  padding: 10px;
  @media (min-width: 1024px) {
    padding: 20px 10px;
  }
`;

export const ForecastWrapper = styled.div`
  flex-basis: 100%;
  margin: 20px 0;
  overflow: hidden;
  width: calc(100vw - 4rem);
`;

export const Forecast = styled.div`
  position: relative;
  display: flex;
  overflow-x: scroll;
  overflow-y: hidden;
  scrollbar-color: lightgray var(--white);
  scrollbar-width: thin;
  margin-top: 20px;
  padding-bottom: 20px;
  @media (min-width: 1024px) {
    order: 4;
  }
`;
