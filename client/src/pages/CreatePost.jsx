import React, { useState } from "react";
import styled from "styled-components";
import GenerateImage from "../components/form/GenerateImage";
import GeneratedImageCard from "../components/cards/GeneratedImageCard";

const Container = styled.div`
  padding: 30px 40px 60px;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: start;
  overflow-y: auto;
  background: ${({ theme }) => theme.bg};
  background-image: radial-gradient(
      circle at top left,
      ${({ theme }) => theme.bgDark + "33"},
      transparent
    ),
    radial-gradient(
      circle at bottom right,
      ${({ theme }) => theme.bgLight + "33"},
      transparent
    );
  animation: fadeIn 0.5s ease;
  transition: background 0.4s ease;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  gap: 8%;
  flex: 1;
  max-width: 1200px;
  min-height: fit-content;
  align-items: flex-start;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 24px;
  }
`;

const CreatePost = () => {
  const [generateImageLoading, setGenerateImageLoading] = useState(false);
  const [createPostLoading, setcreatePostLoading] = useState(false);
  const [post, setPost] = useState({
    name: "",
    prompt: "",
    photo: "",
  });

  return (
    <Container>
      <Wrapper>
        <GenerateImage
          createPostLoading={createPostLoading}
          setcreatePostLoading={setcreatePostLoading}
          generateImageLoading={generateImageLoading}
          setGenerateImageLoading={setGenerateImageLoading}
          post={post}
          setPost={setPost}
        />
        <GeneratedImageCard loading={generateImageLoading} src={post.photo} />
      </Wrapper>
    </Container>
  );
};

export default CreatePost;
