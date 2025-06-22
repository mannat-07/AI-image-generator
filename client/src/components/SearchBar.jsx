import { SearchOutlined } from "@mui/icons-material";
import React from "react";
import styled from "styled-components";

const SearchBarContainer = styled.div`
  max-width: 550px;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 18px;
  border-radius: 24px;
  background: ${({ theme }) => theme.card_light};
  border: 1px solid ${({ theme }) => theme.text_secondary + "55"};
  color: ${({ theme }) => theme.text_primary};
  box-shadow: 0 4px 12px ${({ theme }) => theme.shadow};
  backdrop-filter: blur(6px);
  transition: all 0.3s ease;

  &:focus-within {
    border: 1.5px solid ${({ theme }) => theme.primary};
    box-shadow: 0 0 12px ${({ theme }) => theme.primary + "55"};
  }

  @media (max-width: 600px) {
    padding: 12px 14px;
  }
`;

const StyledInput = styled.input`
  width: 100%;
  background: transparent;
  border: none;
  outline: none;
  font-size: 15px;
  color: ${({ theme }) => theme.text_primary};

  &::placeholder {
    color: ${({ theme }) => theme.text_secondary + "aa"};
    font-style: italic;
    transition: 0.3s ease;
  }
`;

const SearchIcon = styled(SearchOutlined)`
  font-size: 22px;
  color: ${({ theme }) => theme.text_secondary};
  transition: 0.3s ease;

  ${SearchBarContainer}:focus-within & {
    color: ${({ theme }) => theme.primary};
    transform: scale(1.1);
  }
`;

const SearchBar = ({ search, handleChange }) => {
  return (
    <SearchBarContainer>
      <SearchIcon />
      <StyledInput
        type="text"
        placeholder="Search by prompt..."
        value={search}
        onChange={handleChange}
      />
    </SearchBarContainer>
  );
};

export default SearchBar;
