import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { fetchTopTracks } from "../services/lastfmAPI";
import topTrack from "../images/top_track.webp";
import topTrack2 from "../images/top_track2.webp";

const TopTracksContainer = styled.div`
  background-color: black;
  padding: 40px 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
`;

const TrackCard = styled.div`
  width: 300px;
  margin: 20px;
  text-align: center;
  color: white;
`;

const TrackImage = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 10px;
  transition: transform 0.3s ease;
`;

const ListenNowButton = styled.a`
  display: inline-block;
  color: white;
  padding: 10px 15px;
  border-radius: 5px;
  text-decoration: none;
  cursor: pointer;
  margin-top: 10px;
  border: 2px solid gray;

  &:hover {
    background: gray;
  }
`;

const TopTracks = () => {
  const [topTracks, setTopTracks] = useState([]);

  useEffect(() => {
    const loadTopTracks = async () => {
      const tracks = await fetchTopTracks();
      setTopTracks(tracks.slice(0, 2));
    };

    loadTopTracks();
  }, []);

  const images = [topTrack, topTrack2];

  return (
    <TopTracksContainer>
      {topTracks.map((track, index) => (
        <TrackCard key={index}>
          <TrackImage src={images[index % images.length]} alt={`Track ${index + 1}`} />
          <h3>"{track.title}"</h3>
          <ListenNowButton href={track.url} target="_blank" rel="noopener noreferrer">
            LISTEN NOW
          </ListenNowButton>
        </TrackCard>
      ))}
    </TopTracksContainer>
  );
};

export default TopTracks;
