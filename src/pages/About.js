import React from "react";
import styled from "styled-components";
import aboutImage from "../images/about_image.webp";

const AboutContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: center;
  padding: 20px;
  gap: 20px; // Adjust the space between the image and the text
  min-height: 100vh;
`;

const ImageContainer = styled.div`
  flex: 1;
  img {
    width: 100%;
    height: auto;
    border-radius: 8px; // Optional: adds rounded corners to the image
  }
`;

const DescriptionContainer = styled.div`
  flex: 1;
  font-size: 19px;
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
        {/* Add more description or elements as needed */}
      </DescriptionContainer>
    </AboutContainer>
  );
};

export default About;
