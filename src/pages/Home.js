import React from "react";
import HeroSection from "../components/HeroSection";
import TopTracks from "../components/TopTracks";
import UpcomingTours from "../components/UpcomingTours";

// Functional component for the Home page
const Home = () => {
  return (
    <div>
      <HeroSection />
      <TopTracks />
      <UpcomingTours />
    </div>
  );
};

export default Home;
