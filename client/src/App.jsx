import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { bubbleDarkTheme, bubbleLightTheme } from "./utils/Theme";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";

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

function App() {
  // Optional: Add theme toggle
  const [isDark] = useState(true);

  return (
    <ThemeProvider theme={isDark ? bubbleDarkTheme : bubbleLightTheme}>
      <BrowserRouter>
        <Container>
          <Wrapper>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/post" element={<CreatePost />} />
            </Routes>
          </Wrapper>
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
