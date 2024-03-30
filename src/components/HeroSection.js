import React from "react";
import styled from "styled-components";
import heroImg from "../images/hero_image2.jpeg";

const HeroContainer = styled.div`
  text-align: center;
  background-image: url(${heroImg});
  background-size: cover;
  background-position: center;
  padding: 200px 20px;
  height: 300px;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    padding: 100px 20px;
    height: auto;
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    padding: 150px 20px;
    height: auto;
  }
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 32px;
    padding-top: 70px;
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    font-size: 40px;
  }
`;

const Subtext = styled.div`
  margin-bottom: 30px;
  color: #fff;
  font-size: 24px;

  @media (max-width: 768px) {
    font-size: 18px;
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    font-size: 20px;
  }
`;

const HeroSection = () => (
  <HeroContainer>
    <Title>Welcome to the Travis Scott Fan Site</Title>
    <Subtext>Explore the world of Travis Scott</Subtext>
  </HeroContainer>
);

export default HeroSection;
