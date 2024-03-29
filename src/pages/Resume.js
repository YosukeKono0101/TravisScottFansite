import React from "react";
import styled from "styled-components";

const ResumeContainer = styled.div`
  max-width: 800px;
  margin: auto;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
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
  color: #495057;
  font-weight: 600;
`;

const SectionContent = styled.p`
  font-size: 16px;
  color: #495057;
  line-height: 1.5;
`;

const List = styled.ul`
  list-style-type: none;
  padding-left: 0;
`;

const ListItem = styled.li`
  font-size: 16px;
  color: #495057;
  &:before {
    content: "•";
    color: #007bff; // Adjust the bullet point color
    font-weight: bold;
    display: inline-block;
    width: 1em;
    margin-left: -1em;
  }
`;

const Resume = () => {
  return (
    <ResumeContainer>
      <Section>
        <SectionTitle>Overview Summary</SectionTitle>
        <SectionContent>Travis Scott is a world-renowned rapper, singer, and record producer. With a distinctive style blending hip-hop, trap, and auto-tuned vocal elements, Scott has risen to prominence as a pivotal figure in the modern music landscape.</SectionContent>
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
  );
};

export default Resume;
