import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AutoAwesome, CreateRounded } from "@mui/icons-material";
import TextInput from "../Input/TextInput";
import Button from "../buttons/button";
import { CreatePost, GenerateImageFromPrompt } from "../../api";

const Form = styled.div`
  flex: 1;
  padding: 24px 32px;
  display: flex;
  flex-direction: column;
  gap: 10%;
  justify-content: center;
  border-radius: 24px;
  background: ${({ theme }) => theme.bgLight};
  box-shadow: 0 8px 32px ${({ theme }) => theme.shadow};
  transition: all 0.3s ease;
`;

const Top = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Title = styled.div`
  font-size: 30px;
  font-weight: 600;
  color: ${({ theme }) => theme.primary};
  text-shadow: 1px 1px 6px ${({ theme }) => theme.shadow};
  transition: 0.3s ease;
`;

const Desc = styled.div`
  font-size: 17px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary};
  opacity: 0.8;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  font-size: 13px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary};
`;

const Error = styled.div`
  color: ${({ theme }) => theme.red};
  font-weight: 500;
  animation: fadeIn 0.4s ease-in-out;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-4px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const Actions = styled.div`
  display: flex;
  flex: 1;
  gap: 12px;
  flex-wrap: wrap;
`;

const GenerateImage = ({
  createPostLoading,
  setcreatePostLoading,
  generateImageLoading,
  setGenerateImageLoading,
  post,
  setPost,
}) => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const generateImage = async () => {
    setGenerateImageLoading(true);
    setError("");
    try {
      const res = await GenerateImageFromPrompt({ prompt: post.prompt });
      setPost({
        ...post,
        photo: `data:image/jpeg;base64,${res?.data?.photo}`,
      });
    } catch (error) {
      setError(error?.response?.data?.message);
    }
    setGenerateImageLoading(false);
  };

  const createPost = async () => {
    setcreatePostLoading(true);
    setError("");
    try {
      await CreatePost(post);
      navigate("/");
    } catch (error) {
      setError(error?.response?.data?.message);
    }
    setcreatePostLoading(false);
  };

  return (
    <Form>
      <Top>
        <Title>🪄 Generate Image with Prompt</Title>
        <Desc>Describe the image you want — AI will bring it to life!</Desc>
      </Top>

      <Body>
        <TextInput
          label="Author"
          placeholder="Enter your name"
          name="name"
          value={post.name}
          handelChange={(e) => setPost({ ...post, name: e.target.value })}
        />
        <TextInput
          label="Image Prompt"
          placeholder="Write a detailed prompt about the image"
          name="prompt"
          textArea
          rows="8"
          value={post.prompt}
          handelChange={(e) => setPost({ ...post, prompt: e.target.value })}
        />
        {error && <Error>⚠️ {error}</Error>}
        <div style={{ fontSize: "13px", color: "#999" }}>
          * You can post the AI Generated Image to showcase in the community!
        </div>
      </Body>

      <Actions>
        <Button
          text="Generate Image"
          leftIcon={<AutoAwesome />}
          flex
          isLoading={generateImageLoading}
          isDisabled={post.prompt === ""}
          onClick={generateImage}
        />
        <Button
          text="Post Image"
          leftIcon={<CreateRounded />}
          type="secondary"
          flex
          isDisabled={
            post.name === "" || post.photo === "" || post.prompt === ""
          }
          isLoading={createPostLoading}
          onClick={createPost}
        />
      </Actions>
    </Form>
  );
};

export default GenerateImage;
