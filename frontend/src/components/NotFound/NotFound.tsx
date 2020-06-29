import React from 'react';
import { CommentX } from '@styled-icons/boxicons-regular/CommentX';

import * as S from './styled';

const NotFound: React.FC = () => {
  return (
    <S.NotFoundWrapper>
      <S.NotfoundIcon>
        <CommentX style={{ width: '100%' }} />
      </S.NotfoundIcon>
      <S.NotFoundText>Sorry, the specified city was not found..</S.NotFoundText>
    </S.NotFoundWrapper>
  );
};

export default NotFound;
