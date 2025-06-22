import React from "react";
import styled from "styled-components";
import FileSaver from "file-saver";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Avatar } from "@mui/material";
import { DownloadRounded } from "@mui/icons-material";

// Card wrapper with bubble glow and animation
const Card = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.card};
  border-radius: 20px;
  box-shadow: 0 8px 24px ${({ theme }) => theme.shadow};
  gap: 10px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 12px 32px ${({ theme }) => theme.shadow};
    transform: scale(1.04);
  }

  &:nth-child(7n + 1) {
    grid-column: auto / span 2;
    grid-row: auto / span 2;
  }
`;

// Blur + soft pastel overlay
const HoverOverlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: end;
  flex-direction: column;
  justify-content: space-between;
  backdrop-filter: blur(6px);
  background: rgba(0, 0, 0, 0.35);
  padding: 16px;
  opacity: 0;
  border-radius: 20px;
  transition: opacity 0.3s ease;
  color: ${({ theme }) => theme.white};

  ${Card}:hover & {
    opacity: 1;
  }
`;

const Prompt = styled.div`
  font-weight: 400;
  font-size: 15px;
  color: ${({ theme }) => theme.text_primary};
  background: ${({ theme }) => theme.bgDark + "cc"};
  padding: 6px 12px;
  border-radius: 12px;
  margin-bottom: 8px;
`;

const Author = styled.div`
  font-weight: 600;
  font-size: 14px;
  display: flex;
  gap: 8px;
  align-items: center;
  color: ${({ theme }) => theme.text_primary};
  background: ${({ theme }) => theme.bgDark + "cc"};
  padding: 6px 10px;
  border-radius: 12px;
`;

const ImageCard = ({ item }) => {
  return (
    <Card>
      <LazyLoadImage
        alt={item?.prompt}
        width="100%"
        src={item?.photo}
        style={{ borderRadius: "20px", objectFit: "cover" }}
      />
      <HoverOverlay>
        <Prompt>📝 {item?.prompt}</Prompt>
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Author>
            <Avatar
              sx={{
                background: (theme) => theme.palette.success.main,
                width: "32px",
                height: "32px",
              }}
            >
              {item?.name[0]}
            </Avatar>
            {item?.name}
          </Author>
          <DownloadRounded
            sx={{ cursor: "pointer", fontSize: 24 }}
            onClick={() => FileSaver.saveAs(item?.photo, `download.jpg`)}
          />
        </div>
      </HoverOverlay>
    </Card>
  );
};

export default ImageCard;
