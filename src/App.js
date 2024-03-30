import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Components for Routing
import styled from "styled-components";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Resume from "./pages/Resume";
import Portfolio from "./pages/Portfolio";
import VideoDetail from "./pages/VideoDetailPage";
import AlbumDetail from "./pages/AlbumDetailPage";
import ChartPage from "./pages/ChartPage";

// Styled component for the app container with flex to ensure footer sticks at the bottom
const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

// Styled main content container with flex to ensure footer sticks at the bottom
const Content = styled.main`
  flex: 1;
`;

function App() {
  return (
    <Router>
      <AppContainer>
        <Content>
          <Header />
          <Routes>
            s{/* Define routes for navigating between different pages */}
            <Route path="/" element={<Home />} /> {/* Route for the home page */}
            <Route path="/about" element={<About />} /> {/* Route for the about page */}
            <Route path="/resume" element={<Resume />} /> {/* Route for the resume page */}
            <Route path="/portfolio" element={<Portfolio />} /> {/* Route for the portfolio page */}
            <Route path="/chart" element={<ChartPage />} /> {/* Route for the chart page */}
            {/* Route for individual video detail pages, with dynamic segment for videoId */}
            <Route path="/video/:videoId" element={<VideoDetail />} />
            {/* Route for individual album detail pages, with dynamic segments for artistName and albumName */}
            <Route path="/album/:artistName/:albumName" element={<AlbumDetail />} />
          </Routes>
        </Content>
        <Footer />
      </AppContainer>
    </Router>
  );
}

export default App;
