import React from 'react';
import { Line } from 'react-chartjs-2';

import Sidebar from 'components/Sidebar';

import * as S from './styled';

const Climate: React.FC = () => {
  const handleData = () => {
    return {
      labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        {
          label: 'Performance',
          data: [0, 20, 10, 28, 15, 11, 15, 13, 7],
        },
      ],
    };
  };

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
          <Line data={handleData} options={{ maintainAspectRatio: false }} />
        </S.GraphContent>
      </S.GraphWrapper>
    </S.Wrapper>
  );
};

export default Climate;
