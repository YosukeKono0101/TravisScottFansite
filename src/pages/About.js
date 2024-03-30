import React from "react";
import styled from "styled-components";
import aboutImage from "../images/about_image.webp";

const AboutContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: center;
  padding: 40px;
  gap: 40px;
  min-height: 100vh;
  background-color: black;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 20px;
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    padding: 30px;
    gap: 30px;
  }
`;

const ImageContainer = styled.div`
  flex: 1;
  img {
    width: 100%;
    height: auto;
    border-radius: 12px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }
  @media (max-width: 768px) {
    width: 80%;
    margin: 0 auto;
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    width: 90%;
  }
`;

const DescriptionContainer = styled.div`
  flex: 1;
  font-size: 18px;
  color: white;
  line-height: 1.6;

  h2 {
    color: #007bff;
    margin-bottom: 16px;
  }

  p {
    margin-bottom: 16px;
  }

  @media (max-width: 768px) {
    font-size: 16px;
    text-align: center;
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    font-size: 17px;
  }
`;

const About = () => {
  return (
    <AboutContainer>
      <ImageContainer>
        <img src={aboutImage} alt="Travis Scott" />
      </ImageContainer>
      <DescriptionContainer>
        <h2>About Travis Scott</h2>
        <p>
          Travis Scott, born Jacques Berman Webster II, is an American rapper, singer, songwriter, and record producer. Known for his highly energetic and dynamic performances, Scott has become one of the most influential figures in modern hip-hop and trap music. His discography includes critically
          acclaimed albums such as "Rodeo," "Birds in the Trap Sing McKnight," and "Astroworld," the latter of which solidified his status as a superstar in the music industry. Beyond music, Scott's creative vision extends into fashion, merchandise, and even large-scale events like his Astroworld
          Festival.
        </p>
      </DescriptionContainer>
    </AboutContainer>
  );
};

export default About;
