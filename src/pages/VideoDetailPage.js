import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { youtubeSearch } from "../services/youtubeAPI";
import LoadingSpinner from "../components/LoadingSpinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const DetailContainer = styled.div`
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background-color: #f9f9f9;
`;

const VideoTitle = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
`;

const VideoDescription = styled.p`
  font-size: 16px;
  color: #666;
  line-height: 1.6;
  margin-bottom: 20px;
`;

const IframeContainer = styled.div`
  overflow: hidden;
  padding-top: 56.25%; // 16:9 aspect ratio
  position: relative;
`;

const Iframe = styled.iframe`
  border: 0;
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
    background: #555;
  }
`;

const VideoDetail = () => {
  const { videoId } = useParams();
  const navigate = useNavigate();
  const [videoDetails, setVideoDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      const results = await youtubeSearch(videoId);
      const details = results.length > 0 ? results[0] : null;
      setVideoDetails(details);
      setLoading(false);
    };
    fetchDetails();
  }, [videoId]);

  if (loading) return <LoadingSpinner />;

  return (
    <DetailContainer>
      <BackButton onClick={() => navigate(-1)}>
        <FontAwesomeIcon icon={faArrowLeft} style={{ marginRight: "10px" }} />
        Back
      </BackButton>
      {videoDetails ? (
        <>
          <VideoTitle>{videoDetails.title}</VideoTitle>
          <VideoDescription>{videoDetails.description}</VideoDescription>
          <IframeContainer>
            <Iframe src={`https://www.youtube.com/embed/${videoId}`} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></Iframe>
          </IframeContainer>
        </>
      ) : (
        <div>Video not found.</div>
      )}
    </DetailContainer>
  );
};

export default VideoDetail;
