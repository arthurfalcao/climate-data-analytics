import React, { useState } from 'react';
import styled from 'styled-components';
import SearchCity from 'components/SearchCity';
import Result from 'components/Result';
import NotFound from 'components/NotFound';

import bg from 'assets/2850815.jpg';

const Wrapper = styled.div`
  min-height: 100vh;
  margin: 0 15px;
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

const Content = styled.div`
  height: 100%;
  margin: 0 auto;
  position: relative;
`;

const AppTitle = styled.h1`
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

const WeatherWrapper = styled.div`
  max-width: 1500px;
  margin: 0 auto;
  height: calc(100vh - 64px);
  width: 100%;
  position: relative;
`;

function Home() {
  const [value, setValue] = useState('');
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [error, setError] = useState(false);

  const handleSearchCity = (e) => {
    e.preventDefault();
    const APIkey = '84f0c05e16abc57b03ca8fa00b59f78e';

    const weather = `https://api.openweathermap.org/data/2.5/weather?q=${value}&APPID=${APIkey}&units=metric`;
    const forecast = `https://api.openweathermap.org/data/2.5/forecast?q=${value}&APPID=${APIkey}&units=metric`;

    Promise.all([fetch(weather), fetch(forecast)])
      .then(([res1, res2]) => {
        if (res1.ok && res2.ok) {
          return Promise.all([res1.json(), res2.json()]);
        }
        throw Error(res1.statusText, res2.statusText);
      })
      .then(([data1, data2]) => {
        const months = [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'Nocvember',
          'December',
        ];
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const currentDate = new Date();
        const date = `${days[currentDate.getDay()]} ${currentDate.getDate()} ${months[currentDate.getMonth()]}`;
        const sunset = new Date(data1.sys.sunset * 1000).toLocaleTimeString().slice(0, 5);
        const sunrise = new Date(data1.sys.sunrise * 1000).toLocaleTimeString().slice(0, 5);

        const data = {
          city: data1.name,
          country: data1.sys.country,
          date,
          description: data1.weather[0].description,
          main: data1.weather[0].main,
          temp: data1.main.temp,
          highestTemp: data1.main.temp_max,
          lowestTemp: data1.main.temp_min,
          sunrise,
          sunset,
          clouds: data1.clouds.all,
          humidity: data1.main.humidity,
          wind: data1.wind.speed,
          forecast: data2.list,
        };

        setWeatherInfo(data);
        setError(false);
      })
      .catch((err) => {
        console.log(err);

        setWeatherInfo(null);
        setError(true);
      });
  };

  return (
    <Wrapper>
      <Content>
        <AppTitle showLabel={(weatherInfo || error) && true}>Climate Data Analytics</AppTitle>
        <WeatherWrapper>
          <AppTitle secondary showResult={(weatherInfo || error) && true}>
            Climate Data Analytics
          </AppTitle>
          <SearchCity
            value={value}
            showResult={(weatherInfo || error) && true}
            change={(e) => setValue(e.target.value)}
            submit={handleSearchCity}
          />
          {weatherInfo && <Result weather={weatherInfo} />}
          {error && <NotFound error={error} />}
        </WeatherWrapper>
      </Content>
    </Wrapper>
  );
}

export default Home;
