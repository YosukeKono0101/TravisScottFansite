import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Resume from "./pages/Resume";
import Portfolio from "./pages/Portfolio";
import VideoDetail from "./pages/VideoDetailPage";
import AlbumDetail from "./pages/AlbumDetailPage";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/video/:videoId" element={<VideoDetail />} />
        <Route path="/album/:artistName/:albumName" element={<AlbumDetail />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
