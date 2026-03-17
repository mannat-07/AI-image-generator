import React, { Suspense, lazy, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { bubbleDarkTheme, bubbleLightTheme } from "./utils/Theme";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
const Home = lazy(() => import("./pages/Home"));
const CreatePost = lazy(() => import("./pages/CreatePost"));

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
  overflow-x: hidden;
  transition: all 0.3s ease;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const RouteLoader = styled.div`
  min-height: calc(100vh - 88px);
  display: grid;
  place-items: center;
  padding: 32px;
`;

const LoaderPanel = styled.div`
  width: min(520px, 100%);
  padding: 28px;
  border-radius: 28px;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.card},
    ${({ theme }) => theme.bgLight}
  );
  border: 1px solid ${({ theme }) => theme.text_secondary + "22"};
  box-shadow: 0 18px 48px ${({ theme }) => theme.shadow};
`;

const LoaderTitle = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 8px;
`;

const LoaderText = styled.div`
  color: ${({ theme }) => theme.text_secondary};
`;

const RouteFallback = () => (
  <RouteLoader>
    <LoaderPanel>
      <LoaderTitle>Loading experience</LoaderTitle>
      <LoaderText>Fetching the next view and preparing the gallery.</LoaderText>
    </LoaderPanel>
  </RouteLoader>
);

function App() {
  const [isDark] = useState(true);

  return (
    <ThemeProvider theme={isDark ? bubbleDarkTheme : bubbleLightTheme}>
      <BrowserRouter>
        <Container>
          <Wrapper>
            <Navbar />
            <Suspense fallback={<RouteFallback />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/post" element={<CreatePost />} />
              </Routes>
            </Suspense>
          </Wrapper>
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
