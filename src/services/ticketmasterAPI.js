export const fetchUpcomingTours = async () => {
  // Fetch the upcoming tours for Travis Scott
  const apikey = process.env.REACT_APP_TICKET_MASTER_API_KEY;
  // Create the URL for the upcoming tours
  const url = `https://app.ticketmaster.com/discovery/v2/events.json?keyword=Travis+Scott&apikey=${apikey}&size=10`;
  // Fetch the data from the Ticketmaster API
  try {
    // Fetch the data from the Ticketmaster API
    const response = await fetch(url);
    // Check if the response is ok
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    // Parse the JSON data
    const data = await response.json();
    //console.log(data);
    // Return the events from the data
    return data._embedded?.events || [];
  } catch (error) {
    console.error("Error fetching data: ", error);
    return [];
  }
};
