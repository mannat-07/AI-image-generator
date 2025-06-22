import { CircularProgress } from "@mui/material";
import React from "react";
import styled, { keyframes } from "styled-components";

// Animated bubble border glow
const pulse = keyframes`
  0% { box-shadow: 0 0 0px rgba(255,255,255, 0.1); }
  50% { box-shadow: 0 0 16px rgba(255,255,255, 0.25); }
  100% { box-shadow: 0 0 0px rgba(255,255,255, 0.1); }
`;

const Container = styled.div`
  flex: 1;
  padding: 16px;
  border: 3px dashed ${({ theme }) => theme.yellow + "88"};
  background: ${({ theme }) => theme.bgLight};
  color: ${({ theme }) => theme.arrow};
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  text-align: center;
  font-weight: 500;
  font-size: 15px;
  animation: ${pulse} 3s infinite ease-in-out;
  transition: all 0.3s ease;
  box-shadow: 0 8px 24px ${({ theme }) => theme.shadow};

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 12px 28px ${({ theme }) => theme.shadow};
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 20px;
  background: ${({ theme }) => theme.card_light};
  object-fit: cover;
  box-shadow: 0 6px 20px ${({ theme }) => theme.shadow};
`;

const GeneratedImageCard = ({ src, loading }) => {
  return (
    <Container>
      {loading ? (
        <>
          <CircularProgress
            sx={{ color: "inherit", width: "24px", height: "24px" }}
          />
          Generating Your Image . . .
        </>
      ) : src ? (
        <Image src={src} alt="Generated Image" />
      ) : (
        <>🪄 Write a prompt to generate your image</>
      )}
    </Container>
  );
};

export default GeneratedImageCard;
