import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchAlbumDetails } from "../services/lastfmAPI";
import styled, { createGlobalStyle } from "styled-components";
import LoadingSpinner from "../components/LoadingSpinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: black;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
`;

const AlbumDetailContainer = styled.div`
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  background: black;
  color: white;

  @media (max-width: 768px) {
    padding: 15px;
    margin: 20px 10px;
  }

  @media (max-width: 1024px) {
    max-width: 95%;
  }
`;

const AlbumHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const AlbumImage = styled.img`
  width: 100%;
  max-width: 300px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 20px;

  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 20px;
  }
`;

const AlbumTitle = styled.h1`
  color: #fff;
`;

const AlbumArtist = styled.h2`
  color: #ccc;
  margin: 5px 0 20px;
`;

const AlbumInfo = styled.div`
  background: #333;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 20px;
  color: #ccc;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const InfoItem = styled.div`
  margin-bottom: 10px;
`;

const TrackList = styled.ul`
  list-style: none;
  padding: 0;

  @media (max-width: 768px) {
    padding-top: 10px;
  }
`;

const Track = styled.li`
  margin-bottom: 10px;
  background: #222;
  padding: 10px;
  border-radius: 8px;
  color: #fff;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  cursor: pointer;
  background: #555;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  &:hover {
    background: #777;
  }

  @media (max-width: 768px) {
    padding: 5px 10px;
  }
`;

const LastFmButton = styled.a`
  display: inline-block;
  background-color: #e30e5c;
  color: #fff;
  padding: 10px 15px;
  border-radius: 5px;
  text-decoration: none;
  &:hover {
    background-color: #f61f7d;
  }
`;

const TrackListTitle = styled.h2`
  margin-bottom: 10px;
  color: #ccc;
`;

const AlbumDetail = () => {
  const { artistName, albumName } = useParams();
  const navigate = useNavigate();
  const [albumDetails, setAlbumDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const details = await fetchAlbumDetails(artistName, albumName);
        setAlbumDetails(details);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching album details:", error);
      }
    };
    fetchDetails();
  }, [artistName, albumName]);

  return (
    <>
      <GlobalStyle />
      <AlbumDetailContainer>
        <BackButton onClick={() => navigate(-1)}>
          <FontAwesomeIcon icon={faArrowLeft} style={{ marginRight: "10px" }} />
          Back
        </BackButton>
        {loading ? (
          <LoadingSpinner />
        ) : albumDetails ? (
          <>
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
                <LastFmButton href={albumDetails.url} target="_blank" rel="noopener noreferrer">
                  More on Last.fm
                </LastFmButton>
              </InfoItem>
            </AlbumInfo>
            <TrackListTitle>Track List</TrackListTitle>
            <TrackList>
              {albumDetails.tracks?.track.map((track, index) => (
                <Track key={index}>{track.name}</Track>
              ))}
            </TrackList>
          </>
        ) : (
          <div>Album not found.</div>
        )}
      </AlbumDetailContainer>
    </>
  );
};

export default AlbumDetail;
