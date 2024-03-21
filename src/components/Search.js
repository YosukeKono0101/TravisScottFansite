import React, { useState } from "react";

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("videos");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query, type);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search for Travis Scott's music or videos" />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="videos">Videos</option>
          <option value="music">Music</option>
        </select>
        <button type="submit">Search</button>
      </div>
    </form>
  );
};

export default Search;
