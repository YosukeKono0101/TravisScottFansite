import React, { useEffect, useState } from "react";
import { fetchUpcomingTours } from "../services/ticketmasterAPI";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: black;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color: white;    
  }
`;

const ToursContainer = styled.div`
  text-align: center;
  margin: 40px 20px;
  font-size: 20px;

  @media (max-width: 768px) {
    font-size: 16px;
    margin: 20px 10px;
  }
`;

const TourList = styled.ul`
  list-style: none;
  padding: 0;
`;

const TourItem = styled.li`
  margin: 20px 0;

  @media (max-width: 768px) {
    margin: 15px 0;
  }
`;

const OfficialSiteButton = styled.a`
  display: block;
  color: white;
  padding: 6px 20px;
  border-radius: 5px;
  text-decoration: none;
  cursor: pointer;
  margin: 15px auto;
  width: fit-content;
  border: 2px solid gray;

  &:hover {
    background: gray;
  }

  @media (max-width: 768px) {
    padding: 5px 15px;
    font-size: 14px;
  }
`;

const UpcomingTours = () => {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    const getTours = async () => {
      const upcomingTours = await fetchUpcomingTours();
      setTours(upcomingTours);
    };

    getTours();
  }, []);

  return (
    <>
      <GlobalStyle />
      <ToursContainer>
        <h2>Upcoming Tours</h2>
        {tours.length > 0 ? (
          <TourList>
            {tours.map((tour) => (
              <TourItem key={tour.id}>
                {tour.name} - {tour.dates.start.localDate}
              </TourItem>
            ))}
          </TourList>
        ) : (
          <div style={{ color: "white" }}>
            <p>No upcoming tours found.</p>
            <p>
              Visit Travis Scott's official website to get the latest tour information
              <OfficialSiteButton href="https://www.travisscott.com/" target="_blank" rel="noopener noreferrer">
                Visit
              </OfficialSiteButton>
            </p>
          </div>
        )}
      </ToursContainer>
    </>
  );
};

export default UpcomingTours;
