/* eslint-disable camelcase */
import React from 'react';
import { Cloud } from '@styled-icons/boxicons-regular/Cloud';
import { CloudLightning } from '@styled-icons/boxicons-regular/CloudLightning';
import { CloudRain } from '@styled-icons/boxicons-regular/CloudRain';
import { CloudDrizzle } from '@styled-icons/boxicons-regular/CloudDrizzle';
import { CloudSnow } from '@styled-icons/boxicons-regular/CloudSnow';
import { Sun } from '@styled-icons/boxicons-regular/Sun';
import ForecastHour from '../ForecastHour';
import BigLabel from '../BigLabel';
import MediumLabel from '../MediumLabel';
import SmallLabel from '../SmallLabel';
import Text from '../Text';

import * as S from './styled';

type Props = {
  weather: {
    city: string;
    country: string;
    date: string;
    description: string;
    main: string;
    temp: number;
    sunrise: string;
    sunset: string;
    humidity: number;
    wind: number;
    highestTemp: number;
    lowestTemp: number;
    forecast: Array<{
      dt: number;
      dt_txt: string;
      main: {
        temp: number;
      };
      weather: Array<{
        icon: string;
      }>;
    }>;
  };
};

const Result: React.FC<Props> = ({ weather }: Props) => {
  const {
    city,
    country,
    date,
    description,
    main,
    temp,
    sunset,
    sunrise,
    humidity,
    wind,
    highestTemp,
    lowestTemp,
    forecast,
  } = weather;

  const forecasts = forecast.map((item) => (
    <ForecastHour
      key={item.dt}
      temp={Math.floor(item.main.temp * 1) / 1}
      icon={item.weather[0].icon}
      month={item.dt_txt.slice(5, 7)}
      day={item.dt_txt.slice(8, 10)}
      hour={Number(item.dt_txt.slice(11, 13)) * 1}
    />
  ));

  let weatherIcon = null;

  if (main === 'Thunderstorm') {
    weatherIcon = <CloudLightning style={{ width: '100%' }} />;
  } else if (main === 'Drizzle') {
    weatherIcon = <CloudDrizzle style={{ width: '100%' }} />;
  } else if (main === 'Rain') {
    weatherIcon = <CloudRain style={{ width: '100%' }} />;
  } else if (main === 'Snow') {
    weatherIcon = <CloudSnow style={{ width: '100%' }} />;
  } else if (main === 'Clear') {
    weatherIcon = <Sun style={{ width: '100%' }} />;
  } else if (main === 'Clouds') {
    weatherIcon = <Cloud style={{ width: '100%' }} />;
  } else {
    weatherIcon = <Cloud style={{ width: '100%' }} />;
  }

  return (
    <S.Results>
      <S.LocationWrapper>
        <BigLabel>
          {city}, {country}
        </BigLabel>
        <SmallLabel weight="400">{date}</SmallLabel>
      </S.LocationWrapper>
      <S.CurrentWeatherWrapper>
        <S.WeatherIcon>{weatherIcon}</S.WeatherIcon>
        <S.TemperatureWrapper>
          <S.Temperature>{Math.floor(temp)}&#176;</S.Temperature>
          <SmallLabel weight="400" firstToUpperCase>
            {description}
          </SmallLabel>
        </S.TemperatureWrapper>
      </S.CurrentWeatherWrapper>
      <S.WeatherDetailsWrapper>
        <S.WeatherDetail>
          <SmallLabel align="center" weight="400">
            {Math.floor(highestTemp)}&#176;
          </SmallLabel>
          <Text align="center">Hight</Text>
        </S.WeatherDetail>
        <S.WeatherDetail>
          <SmallLabel align="center" weight="400">
            {wind}mph
          </SmallLabel>
          <Text align="center">Wind</Text>
        </S.WeatherDetail>
        <S.WeatherDetail>
          <SmallLabel align="center" weight="400">
            {sunrise}
          </SmallLabel>
          <Text align="center">Sunrise</Text>
        </S.WeatherDetail>
        <S.WeatherDetail>
          <SmallLabel align="center" weight="400">
            {Math.floor(lowestTemp)}&#176;
          </SmallLabel>
          <Text align="center">Low</Text>
        </S.WeatherDetail>
        <S.WeatherDetail>
          <SmallLabel align="center" weight="400">
            {humidity}%
          </SmallLabel>
          <Text align="center">Rain</Text>
        </S.WeatherDetail>
        <S.WeatherDetail>
          <SmallLabel align="center" weight="400">
            {sunset}
          </SmallLabel>
          <Text align="center">Sunset</Text>
        </S.WeatherDetail>
      </S.WeatherDetailsWrapper>
      <S.ForecastWrapper>
        <MediumLabel weight="400">Forecast</MediumLabel>
        <S.Forecast>{forecasts}</S.Forecast>
      </S.ForecastWrapper>
    </S.Results>
  );
};

export default Result;
