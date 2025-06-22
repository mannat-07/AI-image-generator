import { CircularProgress } from "@mui/material";
import React from "react";
import styled, { keyframes } from "styled-components";

// Bubble hover effect animation
const bubbleGlow = keyframes`
  0% { box-shadow: 0 0 0px rgba(255,255,255, 0.3); }
  100% { box-shadow: 0 0 20px rgba(255,255,255, 0.5); }
`;

const Button = styled.div`
  border-radius: 30px;
  color: ${({ theme }) => theme.white};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 12px 28px;
  margin-right: 50px;
  background: ${({ type, theme }) =>
    type === "secondary" ? theme.secondary : theme.primary};
  box-shadow: 0 4px 20px ${({ theme }) => theme.shadow};
  position: relative;
  overflow: hidden;

  @media (max-width: 600px) {
    padding: 10px 20px;
  }

  &:hover {
    transform: scale(1.05) rotate(0.5deg);
    animation: ${bubbleGlow} 0.6s ease-in-out forwards;
  }

  ${({ isDisabled }) =>
    isDisabled &&
    `
    opacity: 0.4;
    cursor: not-allowed;
  `}
  
  ${({ isLoading }) =>
    isLoading &&
    `
    opacity: 0.8;
    cursor: not-allowed;
  `}
  
  ${({ flex }) =>
    flex &&
    `
    flex: 1;
  `}
`;

const BubbleButton = ({
  text,
  isLoading,
  isDisabled,
  rightIcon,
  leftIcon,
  type,
  onClick,
  flex,
}) => {
  return (
    <Button
      onClick={() => !isDisabled && !isLoading && onClick()}
      isDisabled={isDisabled}
      isLoading={isLoading}
      type={type}
      flex={flex}
    >
      {isLoading && (
        <CircularProgress
          style={{ width: "18px", height: "18px", color: "inherit" }}
        />
      )}
      {leftIcon}
      {text}
      {isLoading && <> . . .</>}
      {rightIcon}
    </Button>
  );
};

export default BubbleButton;
