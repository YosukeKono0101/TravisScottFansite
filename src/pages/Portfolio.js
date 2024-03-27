import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { youtubeSearch } from "../services/youtubeAPI";
import { fetchTravisScottData } from "../services/lastfmAPI";
import LoadingSpinner from "../components/LoadingSpinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const PortfolioContainer = styled.div`
  padding: 20px;
  text-align: center;
`;

const SectionTitle = styled.h2`
  margin-top: 40px;
  margin-bottom: 20px;
`;

const SearchForm = styled.form`
  display: flex;
  justify-content: center; // Center the form items
  align-items: center; // Align items vertically
  margin-bottom: 20px;
`;

const SearchInputGroup = styled.div`
  display: flex;
  align-items: center;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px;
  flex-grow: 1;
  max-width: 500px;
`;

const StyledInput = styled.input`
  border: none;
  outline: none;
  padding: 10px;
  width: 100%;
`;

const SearchButton = styled.button`
  padding: 15px 20px;
  border-radius: 5px;
  border: none;
  background-color: #333;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #555;
  }
`;

const ItemList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center; // アイテムを中央に寄せる
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
  margin-top: 10px;
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
    setLoading(true); // Start loading
    try {
      const youtubeResults = await youtubeSearch(searchQuery);
      const lastFmResults = await fetchTravisScottData(searchQuery);
      setVideos(youtubeResults);
      setAlbums(
        lastFmResults.slice(0, 4).map((album) => {
          const imageUrl = album.images.extralarge || album.images.large || album.images.medium || album.images.small;
          return {
            title: album.name,
            thumbnailUrl: imageUrl,
            mbid: album.mbid,
          };
        })
      );
    } catch (error) {
      console.error("Failed to fetch data", error);
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <PortfolioContainer>
      <h1>Travis Scott's Portfolio</h1>
      <SearchForm onSubmit={handleSearch}>
        <SearchInputGroup>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          <StyledInput type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search for videos or music..." />
        </SearchInputGroup>
        <SearchButton type="submit">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </SearchButton>
      </SearchForm>
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
              <ItemLink key={index} to={`/album/${album.mbid}`}>
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
