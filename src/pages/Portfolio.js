import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import { youtubeSearch } from "../services/youtubeAPI";
import { fetchTravisScottData } from "../services/lastfmAPI";
import LoadingSpinner from "../components/LoadingSpinner";
import SearchComponent from "../components/Search";

// Global styles for the entire page
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: black;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
`;

// Styled container for the portfolio with responsive design
const PortfolioContainer = styled.div`
  padding: 20px;
  text-align: center;
  background-color: black;
`;

// Styled h2 for the section title with responsive font sizes
const SectionTitle = styled.h2`
  margin-top: 40px;
  margin-bottom: 20px;
  color: white;
`;

// Styled div for the item list with responsive design
const ItemList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;

  @media (max-width: 768px) {
    gap: 10px;
  }
`;

// Styled link for the item with responsive design
const ItemLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
    opacity: 0.8;
  }
`;

// Styled div for the item content with responsive design
const ItemContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// Styled img for the item image with responsive design
const ItemImage = styled.img`
  width: 100%;
  max-width: 300px;
  height: auto;
  object-fit: cover;
  border-radius: 10px;

  @media (max-width: 768px) {
    max-width: 80%;
    padding-bottom: 20px;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    max-width: 200px;
  }
`;

// Styled h3 for the item title with responsive font sizes
const ItemTitle = styled.h3`
  margin-top: 20px;
  margin-bottom: 20px;
  color: white;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

// Styled error message for the portfolio with responsive design
const ErrorMessage = styled.div`
  color: #ff6b6b;
  background: #fff0f0;
  border: 1px solid #ffcccc;
  padding: 10px;
  border-radius: 5px;
  margin: 20px 0;
`;

// Portfolio page component
const Portfolio = () => {
  const [videos, setVideos] = useState([]); // State for the list of videos
  const [albums, setAlbums] = useState([]); // State for the list of albums
  const [searchQuery, setSearchQuery] = useState(""); // State for the search query
  const [loading, setLoading] = useState(false); // State for loading status
  const [videoError, setVideoError] = useState(""); // State for video error message
  const [albumError, setAlbumError] = useState(""); // State for album error message

  useEffect(() => {
    // Load default content when the component mounts
    loadDefaultContent();
  }, []);

  // Function to load default content
  const loadDefaultContent = async () => {
    setLoading(true);
    setVideoError("");
    setAlbumError("");
    try {
      // Fetch data from both APIs
      const youtubeResults = await youtubeSearch("Travis Scott", "UCtxdfwb9wfkoGocVUAJ-Bmg");
      const lastFmResults = await fetchTravisScottData();
      // Check if no results are found
      if (youtubeResults.length === 0) setVideoError("No videos found");
      if (lastFmResults.length === 0) setAlbumError("No albums found");
      // Log the fetched data
      setVideos(youtubeResults.slice(0, 4));
      setAlbums(
        // Map the album data to the required format
        lastFmResults.slice(0, 4).map((album) => {
          const imageUrl = album.images.extralarge || album.images.large || album.images.medium || album.images.small;
          return {
            artist: album.artist.name,
            title: album.name,
            thumbnailUrl: imageUrl,
            mbid: album.mbid,
          };
        })
      );
    } catch (error) {
      setVideoError("Failed to fetch videos");
      setAlbumError("Failed to fetch albums");
      console.error("Failed to fetch data", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle search
  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setVideoError("");
    setAlbumError("");
    try {
      // Fetch data from both APIs using the search query
      const channelId = "UCtxdfwb9wfkoGocVUAJ-Bmg";
      const youtubeResults = await youtubeSearch(searchQuery, channelId);
      const lastFmResults = await fetchTravisScottData(searchQuery);
      // Check if no results are found
      if (youtubeResults.length === 0) setVideoError("No videos found for the search query.");
      if (lastFmResults.length === 0) setAlbumError("No albums found for the search query.");

      // console.log("Fetched videos:", youtubeResults);
      // console.log("Fetched albums:", lastFmResults);
      // Log the fetched data
      setVideos(youtubeResults.slice(0, 4));
      setAlbums(
        lastFmResults.slice(0, 4).map((album) => {
          const imageUrl = album.images.extralarge || album.images.large || album.images.medium || album.images.small;
          return {
            artist: album.artist.name,
            title: album.name,
            thumbnailUrl: imageUrl,
            mbid: album.mbid,
          };
        })
      );
    } catch (error) {
      setVideoError("Failed to fetch videos for the search query.");
      setAlbumError("Failed to fetch albums for the search query.");
      console.error("Failed to fetch data", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PortfolioContainer>
        <GlobalStyle />
        <h1 style={{ color: "white" }}>Travis Scott's Portfolio</h1>
        {/* Search component to search for videos and albums */}
        <SearchComponent searchQuery={searchQuery} setSearchQuery={setSearchQuery} handleSearch={handleSearch} />
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <SectionTitle>Videos</SectionTitle>
            {/* Show error message if there is an error fetching videos */}
            {videoError ? (
              <ErrorMessage>{videoError}</ErrorMessage>
            ) : (
              <ItemList>
                {/* Map the videos to the required format and display them in the list */}
                {videos.map((video, index) => (
                  <ItemLink key={index} to={`/video/${video.videoId}`}>
                    <ItemContent>
                      <ItemImage src={video.thumbnailUrl} alt={video.title} />
                    </ItemContent>
                  </ItemLink>
                ))}
              </ItemList>
            )}
            <SectionTitle>Albums</SectionTitle>
            {albumError ? (
              <ErrorMessage>{albumError}</ErrorMessage>
            ) : (
              <ItemList>
                {/* Show error message if there is an error fetching albums */}
                {albums.map((album, index) => (
                  <ItemLink key={index} to={`/album/${encodeURIComponent("Travis Scott")}/${encodeURIComponent(album.title)}`}>
                    <ItemContent>
                      <ItemImage src={album.thumbnailUrl} alt={album.title} />
                      <ItemTitle>"{album.title}"</ItemTitle>
                    </ItemContent>
                  </ItemLink>
                ))}
              </ItemList>
            )}
          </>
        )}
      </PortfolioContainer>
    </>
  );
};

export default Portfolio;
