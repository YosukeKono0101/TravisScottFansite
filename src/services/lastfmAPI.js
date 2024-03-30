import axios from "axios";

// Fetches the top tracks of Travis Scott from LastFM
export const fetchTopTracks = async () => {
  const apiKey = process.env.REACT_APP_LASTFM_API_KEY;
  const artistName = "Travis Scott";
  const url = `https://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=${encodeURIComponent(artistName)}&api_key=${apiKey}&format=json&limit=5`;

  // Fetch the top tracks from LastFM
  try {
    // Fetch the data from the URL
    const response = await axios.get(url);
    // Map the response data to the required format
    const tracks = response.data.toptracks.track.map((track) => ({
      title: track.name,
      url: track.url,
      playcount: track.playcount,
      images: track.image.reduce((acc, image) => {
        acc[image.size] = image["#text"];
        return acc;
      }, {}),
    }));
    // Return the mapped data
    return tracks;
  } catch (error) {
    console.error("Error fetching Travis Scott top tracks from LastFM:", error);
    return [];
  }
};

// Fetches the Travis Scott albums from LastFM
export const fetchTravisScottData = async (searchQuery = "") => {
  const apiKey = process.env.REACT_APP_LASTFM_API_KEY;
  const artistName = "Travis Scott";
  const url = `https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=${encodeURIComponent(artistName)}&api_key=${apiKey}&format=json&limit=10`;

  // Fetch the Travis Scott albums from LastFM
  try {
    const response = await axios.get(url);
    let albums = response.data.topalbums.album
      .filter((album) => album.name && album.name !== "(null)")
      .map((album) => ({
        artist: artistName,
        name: album.name,
        playcount: album.playcount,
        mbid: album.mbid,
        url: album.url,
        images: album.image.reduce((acc, image) => {
          acc[image.size] = image["#text"];
          return acc;
        }, {}),
      }));

    // Filter the albums based on the search query
    if (searchQuery) {
      albums = albums.filter((album) => album.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    // Return the filtered albums
    return albums;
  } catch (error) {
    console.error("Error fetching Travis Scott albums from LastFM:", error);
    return [];
  }
};

// Fetches the album details from LastFM
export const fetchAlbumDetails = async (artistName, albumName) => {
  const apiKey = process.env.REACT_APP_LASTFM_API_KEY;
  const url = `https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=${apiKey}&artist=${encodeURIComponent(artistName)}&album=${encodeURIComponent(albumName)}&format=json`;

  // Fetch the album details from LastFM
  try {
    const response = await axios.get(url);
    return response.data.album;
  } catch (error) {
    console.error("Error fetching album details from LastFM:", error);
    return null;
  }
};

// Fetches the top albums of Travis Scott from LastFM
export const fetchTopAlbums = async () => {
  const apiKey = process.env.REACT_APP_LASTFM_API_KEY;
  const artistName = "Travis Scott";
  const url = `https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=${encodeURIComponent(artistName)}&api_key=${apiKey}&format=json&limit=6`;

  // Fetch the top albums from LastFM
  try {
    // Fetch the data from the URL
    const response = await axios.get(url);
    // Map the response data to the required format
    const albums = response.data.topalbums.album
      .filter((album) => album.name && album.name.toLowerCase() !== "(null)")
      .map((album) => ({
        name: album.name,
        playcount: parseInt(album.playcount, 10) || 0,
        listeners: parseInt(album.listeners, 10) || 0,
      }));

    return albums;
  } catch (error) {
    console.error("Error fetching top albums from LastFM:", error);
    return [];
  }
};
