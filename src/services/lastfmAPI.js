import axios from "axios";

export const fetchTravisScottData = async (searchQuery = "") => {
  const apiKey = process.env.REACT_APP_LASTFM_API_KEY;
  const artistName = "Travis Scott";
  const url = `https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=${encodeURIComponent(artistName)}&api_key=${apiKey}&format=json&limit=10`;

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

    if (searchQuery) {
      albums = albums.filter((album) => album.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    return albums;
  } catch (error) {
    console.error("Error fetching Travis Scott albums from LastFM:", error);
    return [];
  }
};

export const fetchAlbumDetails = async (artistName, albumName) => {
  const apiKey = process.env.REACT_APP_LASTFM_API_KEY;
  const url = `https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=${apiKey}&artist=${encodeURIComponent(artistName)}&album=${encodeURIComponent(albumName)}&format=json`;

  try {
    const response = await axios.get(url);
    return response.data.album;
  } catch (error) {
    console.error("Error fetching album details from LastFM:", error);
    return null;
  }
};
