import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { youtubeSearch } from "../services/youtubeAPI";
import LoadingSpinner from "../components/LoadingSpinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import styled, { createGlobalStyle } from "styled-components";

// Global styles for the entire page
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: #000;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color: #fff;
  }
`;

// Styled container for the video details with responsive design
const DetailContainer = styled.div`
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  border-radius: 8px;
  background-color: #000;

  @media (max-width: 768px) {
    margin: 40px auto;
    padding: 10px;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    padding: 20px;
  }
`;

// Styled h1 for the video title with responsive font sizes
const VideoTitle = styled.h1`
  font-size: 24px;
  color: #fff;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 20px;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    font-size: 22px;
  }
`;

// Styled div for the video metadata with responsive design
const VideoMeta = styled.div`
  margin-bottom: 20px;
  font-size: 14px;
  color: #ccc;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

// Styled p for the video description with responsive design
const VideoDescription = styled.p`
  font-size: 16px;
  color: #ccc;
  line-height: 1.5;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

// Styled container for the iframe with responsive design
const IframeContainer = styled.div`
  overflow: hidden;
  padding-top: 56.25%;
  position: relative;
`;

// Styled iframe for the video player with responsive design
const Iframe = styled.iframe`
  border: none;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
`;

// Styled button for the back button with responsive design
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
    background-color: #444;
  }

  @media (max-width: 768px) {
    padding: 5px 10px;
  }
`;

// Component for the VideoDetail page
const VideoDetail = () => {
  const { videoId } = useParams(); // Get the videoId from the URL
  const navigate = useNavigate(); // Get the navigate function from the router
  const [videoDetails, setVideoDetails] = useState(null); // State for the video details
  const [loading, setLoading] = useState(true); // State for loading status

  // Fetch the video details when the component mounts
  useEffect(() => {
    const fetchDetails = async () => {
      // Fetch the video details using the videoId and the channel ID
      const results = await youtubeSearch(videoId, "UCtxdfwb9wfkoGocVUAJ-Bmg");
      // Find the video with the matching videoId
      const videoDetail = results.find((video) => video.videoId === videoId);
      // Set the video details in the state
      setVideoDetails(videoDetail);
      setLoading(false);
    };
    fetchDetails();
  }, [videoId]);

  return (
    <>
      <GlobalStyle />
      <DetailContainer>
        {" "}
        {/* Container for the video details */}
        <BackButton onClick={() => navigate(-1)}>
          {" "}
          {/* Back button to navigate back */}
          <FontAwesomeIcon icon={faArrowLeft} style={{ marginRight: "10px" }} /> Back
        </BackButton>
        {loading ? ( // Show loading spinner while fetching data
          <LoadingSpinner />
        ) : videoDetails ? (
          <>
            {" "}
            {/* Show video details when loaded */}
            <VideoTitle>{videoDetails.title}</VideoTitle>
            <VideoMeta>
              Posted on {videoDetails.publishedAt} by {videoDetails.channelTitle}
            </VideoMeta>
            <VideoDescription>{videoDetails.description}</VideoDescription>
            <IframeContainer>
              <Iframe src={`https://www.youtube.com/embed/${videoId}`} allowFullScreen></Iframe>
            </IframeContainer>
          </>
        ) : (
          <div>Video not found.</div>
        )}
      </DetailContainer>
    </>
  );
};

export default VideoDetail;
