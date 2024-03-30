import React, { useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { fetchTopTracks, fetchTopAlbums } from "../services/lastfmAPI";
import TopTracksChart from "../components/TopTracksChart";
import AlbumsChart from "../components/AlbumsChart";

// Global styles for the entire page
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: black;
    color: white;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
`;

// Styled container for the chart with responsive design
const ChartContainer = styled.div`
  max-width: 1200px;
  margin: 20px auto;
  padding: 20px;
`;

// Styled h1 for the chart title
const Title = styled.h1`
  text-align: center;
  color: #fff;
  margin: 40px 0;
`;

// Functional component for the Chart page
const ChartPage = () => {
  const [topTracks, setTopTracks] = useState([]); // State for the top tracks
  const [topAlbums, setTopAlbums] = useState([]); // State for the top albums

  // Fetch top tracks and albums on page load
  useEffect(() => {
    // Function to fetch top tracks and albums
    const loadData = async () => {
      const tracks = await fetchTopTracks(); // Fetch top tracks
      const albums = await fetchTopAlbums(); // Fetch top albums
      // Set the top tracks and albums in the state
      setTopTracks(tracks);
      setTopAlbums(albums);
    };

    loadData();
  }, []);

  return (
    <>
      <GlobalStyle />
      <ChartContainer>
        <Title>Top Tracks Played</Title>
        <TopTracksChart tracks={topTracks} />
        <Title>Top Albums Played</Title>
        <AlbumsChart albums={topAlbums} />
      </ChartContainer>
    </>
  );
};

export default ChartPage;
