import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Search } from '@styled-icons/boxicons-regular/Search';

const SearchBar = styled.form`
  position: relative;
  margin: 0 auto;
  max-width: 500px;
  transition: 0.8s 0.5s;
  width: 100%;
  @media (min-width: 1440px) {
    max-width: 600px;
  }
  @media (min-width: 2560px) {
    max-width: 700px;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  border: none;
  background-color: #ffffff;
  font-size: 16px;
  padding: 10px 15px 10px 40px;
  color: #c5c5c5;
  transition: 0.2s;
  border-radius: 20px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  &:focus {
    color: #191919;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    outline: none;
  }
  @media (min-width: 768px) {
    font-size: 18px;
  }
  @media (min-width: 1024px) {
    padding: 15px 20px 15px 45px;
    border-radius: 30px;
  }
`;

const SearchIcon = styled.span`
  display: block;
  position: absolute;
  top: 50%;
  left: 22px;
  transform: translate(-50%, -50%);
  height: 16px;
  width: 16px;
  font-size: 14px;
  color: #c5c5c5;
  @media (min-width: 768px) {
    height: 17px;
    width: 17px;
    font-size: 15px;
  }
  @media (min-width: 1024px) {
    height: 18px;
    width: 18px;
    font-size: 16px;
  }
`;

const SearchCity = ({ submit, value, change, showResult }) => {
  return (
    <>
      <SearchBar showResult={showResult} onSubmit={submit}>
        <SearchInput type="text" value={value} placeholder="Procurar cidade" onChange={change} />
        <SearchIcon>
          <Search />
        </SearchIcon>
      </SearchBar>
    </>
  );
};

SearchCity.propTypes = {
  submit: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  change: PropTypes.func.isRequired,
  showResult: PropTypes.bool.isRequired,
};

export default SearchCity;
