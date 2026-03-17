import React from "react";
import styled from "styled-components";
import FileSaver from "file-saver";
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
    transform: translateY(-6px);
  }

  &:nth-child(7n + 1) {
    grid-column: auto / span 2;
    grid-row: auto / span 2;
  }

  @media (max-width: 639px) {
    &:nth-child(7n + 1) {
      grid-column: auto;
      grid-row: auto;
    }
  }
`;

const Media = styled.div`
  position: relative;
  width: 100%;
  min-height: 240px;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  background: ${({ theme }) => theme.bgDark};
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

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transform: scale(1.01);
  transition: transform 0.5s ease;

  ${Card}:hover & {
    transform: scale(1.06);
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
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
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

const DownloadButton = styled.button`
  width: 42px;
  height: 42px;
  padding: 0;
  border-radius: 14px;
  display: grid;
  place-items: center;
  background: ${({ theme }) => theme.bgDark + "cc"};
  box-shadow: none;

  &:hover {
    background: ${({ theme }) => theme.primary};
  }
`;

const ImageCard = ({ item }) => {
  const authorInitial = item?.name?.charAt(0)?.toUpperCase() || "A";

  return (
    <Card>
      <Media>
        <Image
          alt={item?.prompt || "AI generated artwork"}
          src={item?.photo}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
        />
        <HoverOverlay>
          <Prompt>{item?.prompt}</Prompt>
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "12px",
            }}
          >
            <Author>
              <Avatar
                sx={{
                  bgcolor: "rgba(126, 227, 167, 0.18)",
                  color: "#ffffff",
                  width: "32px",
                  height: "32px",
                }}
              >
                {authorInitial}
              </Avatar>
              {item?.name || "Anonymous"}
            </Author>
            <DownloadButton
              type="button"
              onClick={() => FileSaver.saveAs(item?.photo, "download.jpg")}
            >
              <DownloadRounded sx={{ fontSize: 22 }} />
            </DownloadButton>
          </div>
        </HoverOverlay>
      </Media>
    </Card>
  );
};

export default ImageCard;
