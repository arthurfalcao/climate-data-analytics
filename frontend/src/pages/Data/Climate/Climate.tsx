import React, { useEffect, useState } from 'react';
import { ChartData, ChartOptions } from 'chart.js';
import { Line } from 'react-chartjs-2';
import moment from 'moment';

import Sidebar from 'components/Sidebar';
import api from 'services/api';

import * as S from './styled';

type Weather = {
  city: string;
  country: string;
  forecastDate: string;
  id: string;
  maxTemp: string;
  minTemp: string;
};

type Count = {
  [month: string]: number;
};

type MeanTemperature = {
  [month: string]: {
    mean: number;
    average: number;
  };
};

const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dec'];

const chartOptions: ChartOptions = {
  maintainAspectRatio: false,
  scales: {
    xAxes: [
      {
        ticks: {
          fontColor: '#fff',
        },
      },
    ],
    yAxes: [
      {
        ticks: {
          fontColor: '#fff',
          callback: (value) => (!(Number(value) % 5) ? `${value} (ºC)` : null),
        },
      },
    ],
  },
  tooltips: {
    callbacks: {
      label: (item, data) => {
        if (!item.datasetIndex || !data.datasets) return '';

        const label = data.datasets[item.datasetIndex].label || '';
        const { yLabel } = item;
        let content = '';

        if (data.datasets.length > 1) {
          content += label;
        }

        content += `${yLabel}(ºC)`;
        return content;
      },
    },
  },
};

const Climate: React.FC = () => {
  const [meanTemperature, setMeanTemperature] = useState<MeanTemperature>({});

  useEffect(() => {
    const fetchWeather = async () => {
      const { data } = await api.get<Weather[]>('/weather');

      const counts = data.reduce((acc, item) => {
        const month = moment(item.forecastDate).format('MMM');
        return { ...acc, [month]: acc[month] ? acc[month] + 1 : 1 };
      }, {} as Count);

      const initialValues = months.reduce((acc, item) => ({ ...acc, [item]: {} }), {});
      const values = data.reduce((acc, item) => {
        const month = moment(item.forecastDate).format('MMM');
        const average = (Number(item.minTemp) + Number(item.maxTemp)) / 2;

        const monthAverage = acc[month]?.mean ? acc[month].mean + average : average;

        return {
          ...acc,
          [month]: {
            ...acc[month],
            mean: monthAverage,
            average: monthAverage / counts[month],
          },
        };
      }, initialValues as MeanTemperature);
      setMeanTemperature(values);
    };

    fetchWeather();
  }, []);

  function handleData(): ChartData {
    return {
      labels: months,
      datasets: [
        {
          label: 'Média',
          data: Object.values(meanTemperature).map((m) => Math.round(m.average) || 0),
          borderColor: '#96c6ff',
          backgroundColor: '#96c6ff',
          fill: false,
        },
      ],
    };
  }

  return (
    <S.Wrapper>
      <Sidebar />

      <S.GraphWrapper>
        <S.GraphHeader>
          <div>
            <h6 className="text-uppercase text-light ls-1 mb-1">Temperatura média</h6>
            <h2 className="text-white mb-0">Temperatura média</h2>
          </div>
        </S.GraphHeader>
        <S.GraphContent>
          <Line data={handleData} options={chartOptions} />
        </S.GraphContent>
      </S.GraphWrapper>
    </S.Wrapper>
  );
};

export default Climate;
