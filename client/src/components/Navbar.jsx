import React from "react";
import styled from "styled-components";
import Button from "./buttons/button";
import { useLocation, useNavigate } from "react-router";
import { AddRounded, WebRounded } from "@mui/icons-material";

const Container = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.navbar + "dd"};
  color: ${({ theme }) => theme.menu_primary_text};
  font-weight: bold;
  font-size: 22px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 48px;
  border-radius: 0px 0px 18px 18px;
  box-shadow: 0 8px 20px ${({ theme }) => theme.shadow};
  backdrop-filter: blur(14px);
  position: sticky;
  top: 0;
  z-index: 99;
  transition: all 0.3s ease;

  @media only screen and (max-width: 600px) {
    padding: 10px 16px;
    font-size: 18px;
  }
`;

const Logo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  font-weight: 700;
  font-size: 26px;
  color: ${({ theme }) => theme.text_primary};
  transition: 0.3s ease;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.primary};
    text-shadow: 0 0 8px ${({ theme }) => theme.primary};
  }

  @media only screen and (max-width: 600px) {
    font-size: 20px;
  }
`;

const Mark = styled.span`
  font-size: 12px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.text_secondary};
`;

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname.split("/");

  const gotoCreatePost = () => navigate("/post");
  const gotoHome = () => navigate("/");

  return (
    <Container>
      <Logo onClick={gotoHome}>
        PRO GO
        <Mark>AI Image Studio</Mark>
      </Logo>
      {path[1] === "post" ? (
        <Button
          text="Explore Posts"
          leftIcon={<WebRounded style={{ fontSize: "18px" }} />}
          onClick={gotoHome}
          variant="secondary"
        />
      ) : (
        <Button
          text="Create New Post"
          leftIcon={<AddRounded style={{ fontSize: "18px" }} />}
          onClick={gotoCreatePost}
        />
      )}
    </Container>
  );
};

export default Navbar;
