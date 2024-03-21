import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { youtubeSearch } from "../services/youtubeAPI";

const VideoDetail = () => {
  const { videoId } = useParams();
  const [videoDetails, setVideoDetails] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      const results = await youtubeSearch(videoId);
      const details = results.length > 0 ? results[0] : null;
      setVideoDetails(details);
    };
    fetchDetails();
  }, [videoId]);

  if (!videoDetails) return <div>Loading...</div>;

  return (
    <div>
      <h1>{videoDetails.title}</h1>
      <p>{videoDetails.description}</p>
      {/* Here you might want to display the thumbnail or other details */}
      {videoDetails.thumbnailUrl && <img src={videoDetails.thumbnailUrl} alt={videoDetails.title} />}
    </div>
  );
};

export default VideoDetail;
