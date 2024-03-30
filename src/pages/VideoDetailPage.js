import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { youtubeSearch } from "../services/youtubeAPI";
import LoadingSpinner from "../components/LoadingSpinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: #000;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color: #fff;
  }
`;

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

const VideoMeta = styled.div`
  margin-bottom: 20px;
  font-size: 14px;
  color: #ccc;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const VideoDescription = styled.p`
  font-size: 16px;
  color: #ccc;
  line-height: 1.5;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const IframeContainer = styled.div`
  overflow: hidden;
  padding-top: 56.25%;
  position: relative;
`;

const Iframe = styled.iframe`
  border: none;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
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
    background-color: #444;
  }

  @media (max-width: 768px) {
    padding: 5px 10px;
  }
`;

const VideoDetail = () => {
  const { videoId } = useParams();
  const navigate = useNavigate();
  const [videoDetails, setVideoDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      const results = await youtubeSearch(videoId, "UCtxdfwb9wfkoGocVUAJ-Bmg");
      const videoDetail = results.find((video) => video.videoId === videoId);
      setVideoDetails(videoDetail);
      setLoading(false);
    };
    fetchDetails();
  }, [videoId]);

  return (
    <>
      <GlobalStyle />
      <DetailContainer>
        <BackButton onClick={() => navigate(-1)}>
          <FontAwesomeIcon icon={faArrowLeft} style={{ marginRight: "10px" }} /> Back
        </BackButton>
        {loading ? (
          <LoadingSpinner />
        ) : videoDetails ? (
          <>
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
