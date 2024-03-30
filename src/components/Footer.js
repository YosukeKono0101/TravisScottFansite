import React from "react";
import styled from "styled-components";

const StyledFooter = styled.footer`
  background-color: black;
  color: white;
  text-align: center;
  padding: 20px 10px;
  border-top: 1px solid gray;
`;

const OfficialSiteLink = styled.a`
  color: white;
  text-decoration: none;

  &:hover {
    color: gray;
  }
`;

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
