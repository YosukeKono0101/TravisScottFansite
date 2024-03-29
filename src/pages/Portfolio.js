import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { youtubeSearch } from "../services/youtubeAPI";
import { fetchTravisScottData } from "../services/lastfmAPI";
import LoadingSpinner from "../components/LoadingSpinner";
import SearchComponent from "../components/Search";

const PortfolioContainer = styled.div`
  padding: 20px;
  text-align: center;
`;

const SectionTitle = styled.h2`
  margin-top: 40px;
  margin-bottom: 20px;
`;

const ItemList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
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
`;

const ItemTitle = styled.h3`
  margin-top: 20px;
  margin-bottom: 20px;
`;

const Portfolio = () => {
  const [videos, setVideos] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadDefaultContent();
  }, []);

  const loadDefaultContent = async () => {
    setLoading(true);
    try {
      const youtubeResults = await youtubeSearch("Travis Scott");
      const lastFmResults = await fetchTravisScottData();
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
      console.error("Failed to fetch data", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const youtubeResults = await youtubeSearch(searchQuery);
      const lastFmResults = await fetchTravisScottData(searchQuery);

      console.log("Search query:", searchQuery);
      console.log("Fetched albums:", lastFmResults);
      const filteredYoutubeResults = youtubeResults.filter((video) => video.title.toLowerCase().includes(searchQuery.toLowerCase()));

      setVideos(filteredYoutubeResults);
      setAlbums(lastFmResults);
    } catch (error) {
      console.error("Failed to fetch data", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PortfolioContainer>
      <h1>Travis Scott's Portfolio</h1>
      <SearchComponent searchQuery={searchQuery} setSearchQuery={setSearchQuery} handleSearch={handleSearch} />
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <SectionTitle>Videos</SectionTitle>
          <ItemList>
            {videos.map((video, index) => (
              <ItemLink key={index} to={`/video/${video.videoId}`}>
                <ItemContent>
                  <ItemImage src={video.thumbnailUrl} alt={video.title} />
                </ItemContent>
              </ItemLink>
            ))}
          </ItemList>
          <SectionTitle>Albums</SectionTitle>
          <ItemList>
            {albums.map((album, index) => (
              <ItemLink key={index} to={`/album/${encodeURIComponent("Travis Scott")}/${encodeURIComponent(album.title)}`}>
                <ItemContent>
                  <ItemImage src={album.thumbnailUrl} alt={album.title} />
                  <ItemTitle>{album.title}</ItemTitle>
                </ItemContent>
              </ItemLink>
            ))}
          </ItemList>
        </>
      )}
    </PortfolioContainer>
  );
};

export default Portfolio;
