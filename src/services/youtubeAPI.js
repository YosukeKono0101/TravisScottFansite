import axios from "axios";

// Fetches the YouTube search results for the given query and channelId
export const youtubeSearch = async (query, channelId = "", videoId = "") => {
  // Set the parameters based on the query and channelId
  const params = videoId ? { id: videoId } : { query: query, channelId: channelId };
  // Set the options for the request
  const options = {
    method: "GET",
    url: "https://youtube-search-and-download.p.rapidapi.com/search",
    params: params,
    headers: {
      "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
      "X-RapidAPI-Host": "youtube-search-and-download.p.rapidapi.com",
    },
  };

  // Fetch the data from the API
  try {
    // Make the request and get the response
    const response = await axios.request(options);
    // Filter the response to get only the videos
    const videos = response.data.contents
      .filter((item) => item.hasOwnProperty("video"))
      .map(({ video }) => ({
        title: video.title,
        description: video.description,
        thumbnailUrl: video.thumbnails[0]?.url,
        videoId: video.videoId,
        channelId: video.channelId,
        channelTitle: video.channelName,
        publishedAt: video.publishedTimeText,
      }));

    // Return the filtered videos
    return videos.filter((video) => video.channelId === channelId);
  } catch (error) {
    console.error("Error fetching YouTube search results:", error);
    return [];
  }
};
