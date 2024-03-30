import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import resumeImage from "../images/resume_image.webp";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: black;
    background-image: linear-gradient(
      rgba(0, 0, 0, 0.5),
      rgba(0, 0, 0, 0.5)
    ),
    url(${resumeImage});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;    
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  }
`;

const ResumeContainer = styled.div`
  max-width: 800px;
  margin: auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media(max-width: 768px) {
    padding: 20px 10px;
    max-width: 90%;
`;

const Section = styled.section`
  margin-bottom: 40px;
  border-bottom: 1px solid #dee2e6;
  padding-bottom: 20px;
  &:last-child {
    border: none;
  }
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  color: #007bff;
  font-weight: 600;

  @media (max-width: 768px) {
    fnt-size: 20px;
  }
`;

const SectionContent = styled.p`
  font-size: 16px;
  color: white;
  line-height: 1.5;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const List = styled.ul`
  list-style-type: none;
  padding-left: 0;
`;

const ListItem = styled.li`
  font-size: 16px;
  color: white;
  &:before {
    content: "-";
    color: white;
    display: inline-block;
    width: 15px;
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const Resume = () => {
  return (
    <>
      <GlobalStyle />
      <ResumeContainer>
        <Section>
          <SectionTitle>Overview Summary</SectionTitle>
          <SectionContent>Travis Scott is a world-renowned rapper, singer, and record producer. Born on April 30, 1991, he has become a pivotal figure in the modern music landscape with a distinctive style that blends hip-hop, trap, and auto-tuned vocal elements.</SectionContent>
        </Section>

        <Section>
          <SectionTitle>Career History</SectionTitle>
          <SectionContent>
            Scott's career began in earnest with his debut mixtape, "Owl Pharaoh," in 2013, which established him as a force in the hip-hop genre. He has since released multiple successful albums, including "Astroworld," which received widespread critical acclaim and commercial success.
          </SectionContent>
        </Section>

        <Section>
          <SectionTitle>Skills</SectionTitle>
          <List>
            <ListItem>Innovative songwriting and production</ListItem>
            <ListItem>Expertise in sound engineering</ListItem>
            <ListItem>Strong performance and stage presence</ListItem>
            <ListItem>Collaboration with artists across various genres</ListItem>
          </List>
        </Section>

        <Section>
          <SectionTitle>Publications/Notable Outputs</SectionTitle>
          <List>
            <ListItem>Astroworld (Album, 2018)</ListItem>
            <ListItem>Birds in the Trap Sing McKnight (Album, 2016)</ListItem>
            <ListItem>"Sicko Mode" (Single, 2018) - Multi-platinum hit</ListItem>
          </List>
        </Section>

        <Section>
          <SectionTitle>Qualifications</SectionTitle>
          <SectionContent>While Scott's education in formal institutions is less documented, his real-world experience in the music industry, combined with his innovative contributions to modern hip-hop, speak volumes of his qualifications as a leading artist.</SectionContent>
        </Section>
      </ResumeContainer>
    </>
  );
};

export default Resume;
