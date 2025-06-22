import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SearchBar from "../components/SearchBar";
import ImageCard from "../components/cards/ImageCard";
import { GetPosts } from "../api";
import { CircularProgress } from "@mui/material";

const Container = styled.div`
  padding: 30px 30px 160px;
  min-height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${({ theme }) => theme.bg};
  background-image: radial-gradient(
      circle at 20% 20%,
      ${({ theme }) => theme.bgDark + "33"},
      transparent
    ),
    radial-gradient(
      circle at 80% 80%,
      ${({ theme }) => theme.bgLight + "33"},
      transparent
    );
  animation: fadeIn 0.5s ease;

  @media (max-width: 768px) {
    padding: 16px 10px 100px;
  }
`;

const HeadLine = styled.div`
  font-size: 30px;
  font-weight: 600;
  text-align: center;
  color: ${({ theme }) => theme.text_primary};
  display: flex;
  flex-direction: column;
  gap: 6px;

  @media (max-width: 600px) {
    font-size: 22px;
  }
`;

const Span = styled.div`
  font-size: 28px;
  font-weight: 800;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.primary},
    ${({ theme }) => theme.secondary}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: float 2s ease-in-out infinite;
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 1400px;
  padding: 32px 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CardWrapper = styled.div`
  display: grid;
  gap: 24px;

  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (min-width: 640px) and (max-width: 1199px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 639px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filteredPost, setFilteredPost] = useState([]);

  const getPosts = async () => {
    setLoading(true);
    await GetPosts()
      .then((res) => {
        setPosts(res?.data?.data);
        setFilteredPost(res?.data?.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error?.response?.data?.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    getPosts();
  }, []);

  useEffect(() => {
    if (!search) {
      setFilteredPost(posts);
    }
    const filteredPosts = posts.filter((post) => {
      const promptMatch = post?.prompt?.toLowerCase().includes(search);
      const authorMatch = post?.author?.toLowerCase().includes(search);
      return promptMatch || authorMatch;
    });

    if (search) {
      setFilteredPost(filteredPosts);
    }
  }, [posts, search]);

  return (
    <Container>
      <HeadLine>
        Explore Popular Posts in the Community!
        <Span>⦾ Generated with AI ⦾</Span>
      </HeadLine>
      <SearchBar
        search={search}
        handleChange={(e) => setSearch(e.target.value)}
      />
      <Wrapper>
        {error && <div style={{ color: "red" }}>{error}</div>}
        {loading ? (
          <CircularProgress sx={{ color: "var(--primary)", marginTop: "32px" }} />
        ) : (
          <CardWrapper>
            {filteredPost.length > 0 ? (
              filteredPost
                .slice()
                .reverse()
                .map((item, index) => <ImageCard key={index} item={item} />)
            ) : (
              <>No Posts Found!!</>
            )}
          </CardWrapper>
        )}
      </Wrapper>
    </Container>
  );
};

export default Home;
