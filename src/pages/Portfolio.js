import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import { youtubeSearch } from "../services/youtubeAPI";
import { fetchTravisScottData } from "../services/lastfmAPI";
import LoadingSpinner from "../components/LoadingSpinner";
import SearchComponent from "../components/Search";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: black;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
`;

const PortfolioContainer = styled.div`
  padding: 20px;
  text-align: center;
  background-color: black;
`;

const SectionTitle = styled.h2`
  margin-top: 40px;
  margin-bottom: 20px;
  color: white;
`;

const ItemList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;

  @media (max-width: 768px) {
    gap: 10px;
  }
`;

const ItemLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
    opacity: 0.8;
  }
`;

const ItemContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

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

const ItemTitle = styled.h3`
  margin-top: 20px;
  margin-bottom: 20px;
  color: white;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const ErrorMessage = styled.div`
  color: #ff6b6b;
  background: #fff0f0;
  border: 1px solid #ffcccc;
  padding: 10px;
  border-radius: 5px;
  margin: 20px 0;
`;

const Portfolio = () => {
  const [videos, setVideos] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [videoError, setVideoError] = useState("");
  const [albumError, setAlbumError] = useState("");

  useEffect(() => {
    loadDefaultContent();
  }, []);

  const loadDefaultContent = async () => {
    setLoading(true);
    setVideoError("");
    setAlbumError("");
    try {
      const youtubeResults = await youtubeSearch("Travis Scott", "UCtxdfwb9wfkoGocVUAJ-Bmg");
      const lastFmResults = await fetchTravisScottData();
      if (youtubeResults.length === 0) setVideoError("No videos found");
      if (lastFmResults.length === 0) setAlbumError("No albums found");
      // Merge and slice results from both APIs
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
      setVideoError("Failed to fetch videos");
      setAlbumError("Failed to fetch albums");
      console.error("Failed to fetch data", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setVideoError("");
    setAlbumError("");
    try {
      const channelId = "UCtxdfwb9wfkoGocVUAJ-Bmg";
      const youtubeResults = await youtubeSearch(searchQuery, channelId);
      const lastFmResults = await fetchTravisScottData(searchQuery);
      if (youtubeResults.length === 0) setVideoError("No videos found for the search query.");
      if (lastFmResults.length === 0) setAlbumError("No albums found for the search query.");

      console.log("Fetched videos:", youtubeResults);
      console.log("Fetched albums:", lastFmResults);
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
        <SearchComponent searchQuery={searchQuery} setSearchQuery={setSearchQuery} handleSearch={handleSearch} />
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <SectionTitle>Videos</SectionTitle>
            {videoError ? (
              <ErrorMessage>{videoError}</ErrorMessage>
            ) : (
              <ItemList>
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
