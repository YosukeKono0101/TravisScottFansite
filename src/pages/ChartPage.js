import React, { useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { fetchTopTracks, fetchTopAlbums } from "../services/lastfmAPI";
import TopTracksChart from "../components/TopTracksChart";
import AlbumsChart from "../components/AlbumsChart";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: black;
    color: white;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
`;

const ChartContainer = styled.div`
  max-width: 1200px;
  margin: 20px auto;
  padding: 20px;
`;

const Title = styled.h1`
  text-align: center;
  color: #fff;
  margin: 40px 0;
`;

const ChartPage = () => {
  const [topTracks, setTopTracks] = useState([]);
  const [topAlbums, setTopAlbums] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const tracks = await fetchTopTracks();
      const albums = await fetchTopAlbums();
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
