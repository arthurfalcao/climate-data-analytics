import React from 'react';
import { Search } from '@styled-icons/boxicons-regular/Search';

import * as S from './styled';

type Props = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

const SearchCity: React.FC<Props> = ({ onSubmit, value, onChange }: Props) => {
  return (
    <>
      <S.SearchBar onSubmit={onSubmit}>
        <S.SearchInput type="text" value={value} placeholder="Procurar cidade" onChange={onChange} />
        <S.SearchIcon>
          <Search />
        </S.SearchIcon>
      </S.SearchBar>
    </>
  );
};

export default SearchCity;
