import React from "react";
import styled from "styled-components";
import { CircularProgress } from "@mui/material";

const Card = styled.div`
  flex: 1;
  min-width: 280px;
  padding: 14px;
  border: 1px solid ${({ theme }) => theme.text_secondary + 40};
  border-radius: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(
    180deg,
    ${({ theme }) => theme.card},
    ${({ theme }) => theme.bgLight}
  );
  box-shadow: 0 14px 36px ${({ theme }) => theme.shadow + 10};
  min-height: 340px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 18px;
`;

const Frame = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 18px;
  overflow: hidden;
  display: grid;
  place-items: center;
  background: ${({ theme }) => theme.bgDark + "80"};
`;

const PlaceholderText = styled.div`
  color: ${({ theme }) => theme.text_secondary};
  text-align: center;
  padding: 20px;
  line-height: 1.7;
`;

const GeneratedImageCard = ({ src, loading }) => {
  if (loading) {
    return (
      <Card>
        <Frame>
          <div style={{ textAlign: "center" }}>
            <CircularProgress />
            <PlaceholderText>
              Rendering your image preview and preparing the final frame.
            </PlaceholderText>
          </div>
        </Frame>
      </Card>
    );
  }

  if (src) {
    return (
      <Card>
        <Frame>
          <Image src={src} alt="Generated AI Image" loading="eager" />
        </Frame>
      </Card>
    );
  }

  return (
    <Card>
      <Frame>
        <PlaceholderText>
          Your generated image will appear here once the prompt finishes.
        </PlaceholderText>
      </Frame>
    </Card>
  );
};

export default GeneratedImageCard;