import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

// Styled form for the search input and button
const SearchForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

// Styled div for the search input group with responsive design
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

// Styled input for the search input with responsive design
const StyledInput = styled.input`
  border: none;
  outline: none;
  padding: 10px;
  width: 100%;
`;

// Styled button for the search button with responsive design
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

// Functional component for the search input and button
const SearchComponent = ({ searchQuery, setSearchQuery, handleSearch }) => {
  return (
    <SearchForm onSubmit={handleSearch}>
      <SearchInputGroup>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
        <StyledInput type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search for videos or albums..." />
      </SearchInputGroup>
      <SearchButton type="submit">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </SearchButton>
    </SearchForm>
  );
};

export default SearchComponent;
