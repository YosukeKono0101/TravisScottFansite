import React from "react";
import styled from "styled-components";
import heroImg from "../images/hero_image.webp";

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
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Subtext = styled.div`
  margin-bottom: 30px;
  color: #fff;
  font-size: 24px;
`;

const HeroSection = () => (
  <HeroContainer>
    <Title>Welcome to the Travis Scott Fan Site</Title>
    <Subtext>Explore the world of Travis Scott</Subtext>
  </HeroContainer>
);

export default HeroSection;
