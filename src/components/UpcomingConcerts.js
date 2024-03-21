import React, { useEffect, useState } from "react";
import { fetchUpcomingConcerts } from "../services/ticketmasterAPI";

const UpcomingConcerts = () => {
  const [concerts, setConcerts] = useState([]);

  useEffect(() => {
    const getConcerts = async () => {
      const upcomingConcerts = await fetchUpcomingConcerts();
      setConcerts(upcomingConcerts);
    };

    getConcerts();
  }, []);

  return (
    <div>
      <h2>Upcoming Concerts</h2>
      <ul>
        {concerts.map((concert) => (
          <li key={concert.id}>
            {concert.name} - {concert.dates.start.localDate}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UpcomingConcerts;
