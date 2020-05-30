import React, { useState } from 'react';

import SearchCity from 'components/SearchCity';
import Result from 'components/Result';
import NotFound from 'components/NotFound';
import Navbar from 'components/Navbar';

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

function Footer() {
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
    <S.Wrapper>
      <Navbar />

      <S.Content>
        <SearchCity
          value={value}
          showResult={weatherInfo || error}
          change={(e) => setValue(e.target.value)}
          submit={handleSearchCity}
        />
        {weatherInfo && <Result weather={weatherInfo} />}
        {error && <NotFound error={error} />}
      </S.Content>

      <Footer />
    </S.Wrapper>
  );
}

export default Home;
