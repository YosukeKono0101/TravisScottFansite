import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchAlbumDetails } from "../services/lastfmAPI";
import styled, { createGlobalStyle } from "styled-components";
import LoadingSpinner from "../components/LoadingSpinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

// Global styles for the entire page
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: black;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
`;

// Styled container for the album details with responsive design
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

// Styled div for the album header with responsive design
const AlbumHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

// Styled img for the album image with responsive design
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

// Styled h1 for the album title with responsive font sizes
const AlbumTitle = styled.h1`
  color: #fff;
`;

// Styled h2 for the album artist with responsive font sizes
const AlbumArtist = styled.h2`
  color: #ccc;
  margin: 5px 0 20px;
`;

// Styled div for the album information with responsive design
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

// Styled div for each item in the album information
const InfoItem = styled.div`
  margin-bottom: 10px;
`;

// Styled ul for the track list with no list-style and padding
const TrackList = styled.ul`
  list-style: none;
  padding: 0;

  @media (max-width: 768px) {
    padding-top: 10px;
  }
`;

// Styled li for each track with a background color and padding
const Track = styled.li`
  margin-bottom: 10px;
  background: #222;
  padding: 10px;
  border-radius: 8px;
  color: #fff;
`;

// Styled button for the back button with responsive design
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

// Styled a for the Last.fm button with responsive design
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

// Styled h2 for the track list title with responsive font sizes
const TrackListTitle = styled.h2`
  margin-bottom: 10px;
  color: #ccc;
`;

const ErrorMessage = styled.div`
  color: #ff6b6b;
  background: #fff0f0;
  border: 1px solid #ffcccc;
  padding: 10px;
  border-radius: 5px;
  margin: 20px 0;
`;

// Page component for the album detail page
const AlbumDetail = () => {
  const { artistName, albumName } = useParams(); // Get the artist and album name from the URL
  const navigate = useNavigate(); // Get the navigate function from the router
  const [albumDetails, setAlbumDetails] = useState(null); // State for the album details
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(""); // State for error status

  useEffect(() => {
    // Fetch the album details when the component mounts
    const fetchDetails = async () => {
      try {
        // Fetch the album details using the artist and album name
        const details = await fetchAlbumDetails(artistName, albumName);
        // Set the album details in the state and set loading to false
        setAlbumDetails(details);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching album details:", error);
        setError("Failed to fetch album details. Please try again later.");
      }
    };
    fetchDetails();
  }, [artistName, albumName]);

  return (
    <>
      <GlobalStyle />
      <AlbumDetailContainer>
        {" "}
        {/* Container for the album details */}
        <BackButton onClick={() => navigate(-1)}>
          <FontAwesomeIcon icon={faArrowLeft} style={{ marginRight: "10px" }} />
          Back
        </BackButton>
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorMessage>{error}</ErrorMessage>
        ) : albumDetails ? (
          <>
            {" "}
            {/* Show album details when loaded */}
            <AlbumHeader>
              {/* Show album image, title, and artist */}
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
              {/* Show each track in the album */}
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
