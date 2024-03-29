import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const SearchForm = styled.form`
  display: flex;
  justify-content: center; // Center the form items
  align-items: center; // Align items vertically
  margin-bottom: 20px;
`;

const SearchInputGroup = styled.div`
  display: flex;
  align-items: center;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px;
  flex-grow: 1;
  max-width: 500px;
`;

const StyledInput = styled.input`
  border: none;
  outline: none;
  padding: 10px;
  width: 100%;
`;

const SearchButton = styled.button`
  padding: 15px 20px;
  border-radius: 5px;
  border: none;
  background-color: #333;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #555;
  }
`;

const SearchComponent = ({ searchQuery, setSearchQuery, handleSearch }) => {
  return (
    <SearchForm onSubmit={handleSearch}>
      <SearchInputGroup>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
        <StyledInput type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search for videos or music..." />
      </SearchInputGroup>
      <SearchButton type="submit">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </SearchButton>
    </SearchForm>
  );
};

export default SearchComponent;
