import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { youtubeSearch } from "../services/youtubeAPI";
import LoadingSpinner from "../components/LoadingSpinner"; // Assuming you have this component

const DetailContainer = styled.div`
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const VideoTitle = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const VideoDescription = styled.p`
  font-size: 16px;
  color: #666;
  line-height: 1.6;
`;

const IframeContainer = styled.div`
  overflow: hidden;
  /* 16:9 aspect ratio */
  padding-top: 56.25%;
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

const VideoDetail = () => {
  const { videoId } = useParams();
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
