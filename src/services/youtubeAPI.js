import axios from "axios";

export const youtubeSearch = async (query, channelId = "", videoId = "") => {
  const params = videoId ? { id: videoId } : { query: query, channelId: channelId };
  const options = {
    method: "GET",
    url: "https://youtube-search-and-download.p.rapidapi.com/search",
    params: params,
    headers: {
      "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
      "X-RapidAPI-Host": "youtube-search-and-download.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
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

    return videos.filter((video) => video.channelId === channelId);
  } catch (error) {
    console.error("Error fetching YouTube search results:", error);
    return [];
  }
};
