export const fetchUpcomingConcerts = async () => {
  const apikey = process.env.REACT_APP_TICKET_MASTER_API_KEY;
  const url = `https://app.ticketmaster.com/discovery/v2/events.json?keyword=Travis+Scott&apikey=${apikey}&size=10`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data._embedded?.events || [];
  } catch (error) {
    console.error("Error fetching data: ", error);
    return [];
  }
};
