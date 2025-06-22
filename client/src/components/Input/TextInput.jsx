import React from "react";
import styled from "styled-components";

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Label = styled.label`
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.menu_secondary_text};
  padding: 0px 4px;
  text-transform: uppercase;
  transition: 0.3s;
  letter-spacing: 0.8px;

  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const OutlinedInput = styled.div`
  border-radius: 16px;
  border: 1.2px solid ${({ theme }) => theme.text_secondary + "66"};
  background-color: ${({ theme }) => theme.card_light};
  color: ${({ theme }) => theme.text_primary};
  padding: 14px 18px;
  display: flex;
  align-items: center;
  transition: 0.25s ease;
  box-shadow: 0 4px 12px ${({ theme }) => theme.shadow};

  &:focus-within {
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 16px ${({ theme }) => theme.primary + "55"};
  }
`;

const Input = styled.input`
  width: 100%;
  font-size: 15px;
  font-weight: 400;
  outline: none;
  border: none;
  resize: none;
  background-color: transparent;
  color: ${({ theme }) => theme.text_primary};

  &::placeholder {
    color: ${({ theme }) => theme.text_secondary + "99"};
    font-style: italic;
    opacity: 0.7;
  }

  &:focus {
    outline: none;
  }
`;

const TextInput = ({
  label,
  placeholder,
  name,
  value,
  handelChange,
  textArea,
  rows,
  columns,
}) => {
  return (
    <Container>
      <Label>{label}</Label>
      <OutlinedInput>
        <Input
          as={textArea ? "textarea" : "input"}
          name={name}
          rows={rows}
          columns={columns}
          placeholder={placeholder}
          value={value}
          onChange={(e) => handelChange(e)}
        />
      </OutlinedInput>
    </Container>
  );
};

export default TextInput;
