import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { fetchTopTracks } from "../services/lastfmAPI";
import topTrack from "../images/top_track.webp";
import topTrack2 from "../images/top_track2.webp";

// Styled container for the top tracks section
const TopTracksContainer = styled.div`
  background-color: black;
  padding: 40px 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
`;

// Styled div for the track card with responsive design
const TrackCard = styled.div`
  width: 300px;
  margin: 20px;
  text-align: center;
  color: white;
`;

// Styled img for the track image with responsive design
const TrackImage = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 10px;
  transition: transform 0.3s ease;
`;

// Styled a for the listen now button with responsive design
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

// Functional component for the top tracks section
const TopTracks = () => {
  const [topTracks, setTopTracks] = useState([]); // State for the top tracks

  // Fetch top tracks on page load
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
