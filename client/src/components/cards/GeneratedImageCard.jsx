import React from "react";
import styled from "styled-components";
import { CircularProgress } from "@mui/material";

const Card = styled.div`
  flex: 1;
  min-width: 280px;
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.text_secondary + 40};
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.bgLight};
  box-shadow: 0 4px 20px ${({ theme }) => theme.shadow + 10};
  min-height: 340px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 16px;
`;

const PlaceholderText = styled.div`
  color: ${({ theme }) => theme.text_secondary};
  text-align: center;
  padding: 20px;
`;

const GeneratedImageCard = ({ src, loading }) => {
  if (loading) {
    return (
      <Card>
        <CircularProgress />
      </Card>
    );
  }

  if (src) {
    return (
      <Card>
        <Image src={src} alt="Generated AI Image" />
      </Card>
    );
  }

  return (
    <Card>
      <PlaceholderText>
        Your generated image will appear here.
      </PlaceholderText>
    </Card>
  );
};

export default GeneratedImageCard;