import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import logoImg from "../images/logo.png";
import SocialMediaContainer from "./SocialMediaContainer";

const HeaderContainer = styled.header`
  background-color: black;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px; // adjustment needed
  box-sizing: border-box;
`;

const Logo = styled.img`
  height: 65px;
  width: auto;
`;

const Navigation = styled.nav`
  ul {
    list-style: none;
    display: flex;
    margin: 0;
    padding: 0;
  }

  li {
    margin-right: 20px; // Adjust spacing as needed
  }

  a {
    color: white;
    text-decoration: none;
    font-weight: bold;
    transition: color 0.3s ease-in-out;

    &:hover {
      color: #ccc; // Change hover color as needed
    }
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Navigation>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/resume">Resume</Link>
          </li>
          <li>
            <Link to="/portfolio">Portfolio</Link>
          </li>
        </ul>
      </Navigation>
      <Logo src={logoImg} alt="Logo" />
      <SocialMediaContainer />
    </HeaderContainer>
  );
};

export default Header;
