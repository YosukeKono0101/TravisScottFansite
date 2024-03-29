import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchAlbumDetails } from "../services/lastfmAPI";
import styled from "styled-components";
import LoadingSpinner from "../components/LoadingSpinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const AlbumDetailContainer = styled.div`
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background: #f9f9f9;
`;

const AlbumHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const AlbumImage = styled.img`
  width: 100%;
  max-width: 300px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 20px;
`;

const AlbumTitle = styled.h1`
  color: #333;
  margin: 0;
`;

const AlbumArtist = styled.h2`
  color: #666;
  margin: 5px 0 20px;
`;

const AlbumInfo = styled.div`
  background: #e9e9e9;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const InfoItem = styled.div`
  margin-bottom: 10px;
`;

const TrackList = styled.ul`
  list-style: none;
  padding: 0;
`;

const Track = styled.li`
  margin-bottom: 10px;
  background: #fff;
  padding: 10px;
  border-radius: 8px;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  cursor: pointer;
  background: #333;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  &:hover {
    background: #555;
  }
`;

const AlbumDetail = () => {
  const { artistName, albumName } = useParams();
  const navigate = useNavigate();
  const [albumDetails, setAlbumDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const details = await fetchAlbumDetails(artistName, albumName);
        setAlbumDetails(details);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching album details:", error);
        setError("Failed to fetch album details.");
        setLoading(false);
      }
    };

    fetchDetails();
  }, [artistName, albumName]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div>{error}</div>;
  if (!albumDetails) return <div>Album details not found.</div>;

  return (
    <AlbumDetailContainer>
      <BackButton onClick={() => navigate(-1)}>
        <FontAwesomeIcon icon={faArrowLeft} style={{ marginRight: "10px" }} />
        Back
      </BackButton>
      <AlbumHeader>
        <AlbumImage src={albumDetails.image.find((img) => img.size === "large")["#text"]} alt={albumDetails.name} />
        <div>
          <AlbumTitle>{albumDetails.name}</AlbumTitle>
          <AlbumArtist>by {albumDetails.artist}</AlbumArtist>
        </div>
      </AlbumHeader>
      <AlbumInfo>
        <InfoItem>Release Date: {albumDetails.releasedate}</InfoItem>
        <InfoItem>Listeners: {albumDetails.listeners}</InfoItem>
        <InfoItem>Playcount: {albumDetails.playcount}</InfoItem>
        <InfoItem>
          <a href={albumDetails.url} target="_blank" rel="noopener noreferrer">
            More on Last.fm
          </a>
        </InfoItem>
      </AlbumInfo>
      <TrackList>
        {albumDetails.tracks?.track.map((track, index) => (
          <Track key={index}>{track.name}</Track>
        ))}
      </TrackList>
    </AlbumDetailContainer>
  );
};

export default AlbumDetail;
