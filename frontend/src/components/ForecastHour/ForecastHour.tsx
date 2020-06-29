import React from 'react';
import SmallLabel from 'components/ui/SmallLabel';
import Text from 'components/ui/Text';

import * as S from './styled';

type Props = {
  temp: number;
  month: string;
  day: string;
  hour: number;
  icon: string;
};

const ForecastHour: React.FC<Props> = ({ temp, month, day, hour, icon }: Props) => {
  const iconUrl = `https://openweathermap.org/img/w/${icon}.png`;

  return (
    <S.ForecastWrapper>
      <Text align="center">
        {month}.{day}
      </Text>
      <Text align="center">{hour}:00</Text>
      <S.WeatherIcon src={iconUrl} />
      <SmallLabel align="center" weight="400">
        {temp}&#176;
      </SmallLabel>
    </S.ForecastWrapper>
  );
};

export default ForecastHour;
