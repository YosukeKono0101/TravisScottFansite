import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { youtubeSearch } from "../services/youtubeAPI";
import { fetchTravisScottData } from "../services/spotifyAPI";

const Portfolio = () => {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadDefaultContent();
  }, []);

  const loadDefaultContent = async () => {
    const youtubeResults = await youtubeSearch("Travis Scott");
    const spotifyResults = await fetchTravisScottData();
    setItems([...youtubeResults.slice(0, 5), ...spotifyResults.slice(0, 5)]);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery) {
      loadDefaultContent();
      return;
    }
    const youtubeResults = await youtubeSearch(searchQuery);
    const spotifyResults = await fetchTravisScottData(searchQuery);
    setItems([...youtubeResults, ...spotifyResults]);
  };

  return (
    <div>
      <h1>Travis Scott's Portfolio</h1>
      <form onSubmit={handleSearch}>
        <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search for videos or music..." />
        <button type="submit">Search</button>
      </form>
      {items.map((item, index) => (
        <div key={index}>
          <h3>{item.title}</h3>
          <img src={item.thumbnailUrl} alt={item.title} style={{ width: "100px", height: "100px" }} />
          {item.videoId && <Link to={`/video/${item.videoId}`}>View Details</Link>}
          {item.uri && <Link to={`/track/${item.uri.split(":")[2]}`}>View Details</Link>}
        </div>
      ))}
    </div>
  );
};

export default Portfolio;
