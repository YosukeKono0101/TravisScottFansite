import React from "react";
import styled from "styled-components";

const StyledFooter = styled.footer`
  background-color: black;
  color: white;
  text-align: center;
  padding: 20px 10px; // Adjust padding as needed
`;

const OfficialSiteLink = styled.a`
  color: white;
  text-decoration: none;

  &:hover {
    color: #ccc;
  }
`;

const Footer = () => {
  return (
    <StyledFooter>
      <p>
        © 2023 Travis Scott Fan Site | Visit Travis's Official Site:{" "}
        <OfficialSiteLink href="https://www.travisscott.com/" target="_blank" rel="noopener noreferrer">
          www.travisscott.com
        </OfficialSiteLink>
      </p>
    </StyledFooter>
  );
};

export default Footer;
