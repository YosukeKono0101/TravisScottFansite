import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchAlbumDetails } from "../services/lastfmAPI";
import styled from "styled-components";

const AlbumDetailContainer = styled.div`
  max-width: 800px;
  margin: auto;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
`;

const AlbumTitle = styled.h1`
  color: #333;
  margin-bottom: 20px;
`;

const AlbumArtist = styled.h2`
  color: #666;
  margin-bottom: 20px;
`;

const AlbumImage = styled.img`
  width: 100%;
  max-width: 300px;
  border-radius: 5px;
  margin-bottom: 20px;
`;

const TrackList = styled.ul`
  list-style: none;
  padding: 0;
`;

const Track = styled.li`
  margin-bottom: 10px;
`;

const AlbumDetail = () => {
  const { artistName, albumName } = useParams();
  const [albumDetails, setAlbumDetails] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      const details = await fetchAlbumDetails(artistName, albumName);
      setAlbumDetails(details);
    };

    fetchDetails();
  }, [artistName, albumName]);

  if (!albumDetails) {
    return <div>Loading...</div>;
  }

  return (
    <AlbumDetailContainer>
      <AlbumImage src={albumDetails.image.find((img) => img.size === "large")["#text"]} alt={albumDetails.name} />
      <AlbumTitle>{albumDetails.name}</AlbumTitle>
      <AlbumArtist>by {albumDetails.artist}</AlbumArtist>
      <TrackList>
        {albumDetails.tracks.track.map((track, index) => (
          <Track key={index}>
            {track.name} - {Math.floor(track.duration / 60)}:{String(track.duration % 60).padStart(2, "0")}
          </Track>
        ))}
      </TrackList>
    </AlbumDetailContainer>
  );
};

export default AlbumDetail;
