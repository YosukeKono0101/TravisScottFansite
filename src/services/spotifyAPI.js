import axios from "axios";

export const fetchTravisScottData = async () => {
  const options = {
    method: "GET",
    url: "https://spotify23.p.rapidapi.com/search/",
    params: {
      q: "Travis Scott",
      type: "multi",
      offset: "0",
      limit: "10",
      numberOfTopResults: "5",
    },
    headers: {
      "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
      "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    if (response.data && response.data.tracks && response.data.tracks.items) {
      const tracks = response.data.tracks.items.map((item) => {
        const track = item.data;
        return {
          uri: track.uri,
          name: track.name, // Assuming there's a 'name' directly within each 'item'
          albumName: track.albumOfTrack ? track.albumOfTrack.name : "Unknown Album",
          artists: track.artists ? track.artists.items.map((artist) => artist.profile.name).join(", ") : "Unknown Artist",
          duration: track.duration ? track.duration.totalMilliseconds : 0,
        };
      });
      return tracks;
    } else {
      console.error("Invalid response structure:", response);
      return [];
    }
  } catch (error) {
    console.error("Error fetching Travis Scott data:", error);
    return [];
  }
};
