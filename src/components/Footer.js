import React from "react";
import styled from "styled-components";

// Styled footer with black background, white text, and center alignment
const StyledFooter = styled.footer`
  background-color: black;
  color: white;
  text-align: center;
  padding: 20px 10px;
  border-top: 1px solid gray;
`;

// Styled link for the official site with white color and no text decoration
const OfficialSiteLink = styled.a`
  color: white;
  text-decoration: none;

  &:hover {
    color: gray;
  }
`;

// Functional component for the footer
const Footer = () => {
  return (
    <StyledFooter>
      <p>
        © 2024 Travis Scott Fan Site | Travis's Official Site:{" "}
        <OfficialSiteLink href="https://www.travisscott.com/" target="_blank" rel="noopener noreferrer">
          www.travisscott.com
        </OfficialSiteLink>
      </p>
    </StyledFooter>
  );
};

export default Footer;
