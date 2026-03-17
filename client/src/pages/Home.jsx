import React, { useDeferredValue, useEffect, useState } from "react";
import styled from "styled-components";
import SearchBar from "../components/SearchBar";
import ImageCard from "../components/cards/ImageCard";
import { GetPosts } from "../api";

const Container = styled.div`
  padding: 32px 24px 120px;
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
    padding: 18px 12px 96px;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 1280px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 8px;

  @media (max-width: 768px) {
    gap: 8px;
  }
`;

const Title = styled.h1`
  margin: 0;
  font-size: 34px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  letter-spacing: -0.02em;

  @media (max-width: 600px) {
    font-size: 28px;
  }
`;

const Subtitle = styled.p`
  margin: 0;
  max-width: 720px;
  color: ${({ theme }) => theme.text_secondary};
  font-size: 15px;
  line-height: 1.7;
`;

const Toolbar = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  padding: 0 0 8px;

  @media (max-width: 768px) {
    align-items: stretch;
  }
`;

const SearchWrap = styled.div`
  flex: 1 1 520px;
  min-width: min(100%, 280px);
`;

const ToolbarMeta = styled.div`
  flex: 0 1 auto;
  color: ${({ theme }) => theme.text_secondary};
  font-size: 14px;
  white-space: nowrap;

  @media (max-width: 768px) {
    white-space: normal;
  }
`;

const ResultsHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  padding-top: 4px;
`;

const ResultsTitleGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ResultsTitle = styled.h2`
  margin: 0;
  color: ${({ theme }) => theme.text_primary};
  font-size: 24px;
  font-weight: 700;
  letter-spacing: -0.02em;
`;

const ResultsHint = styled.div`
  color: ${({ theme }) => theme.text_secondary};
  font-size: 14px;
`;

const ResultsCount = styled.div`
  padding: 8px 12px;
  border-radius: 999px;
  background: ${({ theme }) => theme.bgDark + "70"};
  color: ${({ theme }) => theme.text_primary};
  font-size: 13px;
  font-weight: 600;
`;

const CardWrapper = styled.div`
  width: 100%;
  display: grid;
  gap: 26px;

  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (min-width: 640px) and (max-width: 1199px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 639px) {
    grid-template-columns: 1fr;
  }
`;

const EmptyState = styled.div`
  width: 100%;
  padding: 40px 28px;
  border-radius: 20px;
  text-align: center;
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.text_secondary + "20"};
  color: ${({ theme }) => theme.text_secondary};
  box-shadow: 0 12px 32px ${({ theme }) => theme.shadow};
`;

const EmptyTitle = styled.div`
  color: ${({ theme }) => theme.text_primary};
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 10px;
`;

const LoadingGrid = styled(CardWrapper)``;

const SkeletonCard = styled.div`
  min-height: 260px;
  border-radius: 24px;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.card} 0%,
    ${({ theme }) => theme.bgLight} 50%,
    ${({ theme }) => theme.card} 100%
  );
  background-size: 220% 100%;
  animation: shimmer 1.6s linear infinite;
  box-shadow: 0 12px 32px ${({ theme }) => theme.shadow};

  @keyframes shimmer {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filteredPost, setFilteredPost] = useState([]);
  const deferredSearch = useDeferredValue(search.trim().toLowerCase());

  const getPostsErrorMessage = (error) => {
    if (error.response) {
      return error.response.data?.message || "Failed to load posts.";
    }

    if (error.request) {
      return "Backend is not running on port 8080. Start the server and refresh.";
    }

    return error.message || "Failed to load posts.";
  };

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      setError("");

      await GetPosts()
        .then((res) => {
          setPosts(res?.data?.data);
          setFilteredPost(res?.data?.data);
          setLoading(false);
        })
        .catch((error) => {
          setError(getPostsErrorMessage(error));
          setLoading(false);
        });
    };

    loadPosts();
  }, []);

  useEffect(() => {
    if (!deferredSearch) {
      setFilteredPost(posts);
      return;
    }

    const filteredPosts = posts.filter((post) => {
      const promptMatch = post?.prompt
        ?.toLowerCase()
        .includes(deferredSearch);
      const authorMatch = post?.name?.toLowerCase().includes(deferredSearch);
      return promptMatch || authorMatch;
    });

    setFilteredPost(filteredPosts);
  }, [deferredSearch, posts]);

  return (
    <Container>
      <Wrapper>
        <Header>
          <Title>Community Creations</Title>
          <Subtitle>
            Browse AI-generated images, search by prompt or creator, and keep
            the gallery experience simple.
          </Subtitle>
        </Header>
        <Toolbar>
          <SearchWrap>
            <SearchBar
              search={search}
              handleChange={(e) => setSearch(e.target.value)}
              placeholder="Search by prompt or creator"
            />
          </SearchWrap>
          <ToolbarMeta>
            {error
              ? error
              : deferredSearch
                ? `Showing results for "${deferredSearch}"`
                : "All posts"}
          </ToolbarMeta>
        </Toolbar>
        <ResultsHeader>
          <ResultsTitleGroup>
            <ResultsTitle>Latest posts</ResultsTitle>
            <ResultsHint>
              {loading
                ? "Loading community posts..."
                : "Updated from the latest shared prompts."}
            </ResultsHint>
          </ResultsTitleGroup>
          <ResultsCount>
            {filteredPost.length} result{filteredPost.length === 1 ? "" : "s"}
          </ResultsCount>
        </ResultsHeader>
        {loading ? (
          <LoadingGrid>
            {Array.from({ length: 8 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </LoadingGrid>
        ) : (
          <CardWrapper>
            {filteredPost.length > 0 ? (
              filteredPost
                .slice()
                .reverse()
                .map((item, index) => <ImageCard key={index} item={item} />)
            ) : (
              <EmptyState>
                <EmptyTitle>
                  {error ? "Gallery unavailable" : "No posts found"}
                </EmptyTitle>
                {error ||
                  "Try a different search term or generate a new image to populate the feed."}
              </EmptyState>
            )}
          </CardWrapper>
        )}
      </Wrapper>
    </Container>
  );
};

export default Home;
