import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import logoImg from "../images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter, faYoutube, faSpotify, faInstagram, faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";

// Styled component for the header container with responsive design adjustments.
const HeaderContainer = styled.header`
  background-color: black;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  box-sizing: border-box;
  position: sticky;
  top: 0;
  z-index: 100;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Logo = styled.img`
  height: 60px;
  width: auto;

  @media (max-width: 768px) {
    order: 1;
  }
`;

// Responsive social media wrapper component.
const SocialMediaWrapper = styled.div`
  display: flex;
  justify-content: center;

  @media (max-width: 768px) {
    display: ${({ $isMenuOpen }) => ($isMenuOpen ? "flex" : "none")};
    order: 2;
    width: 100%;
    margin-bottom: 10px;
  }

  a {
    color: white;
    margin-left: 20px;
    font-size: 24px;
    &:hover {
      color: #ccc;
    }
  }
`;

// Styling for each social media icon link.
const IconLink = styled.a`
  color: white;
  margin-left: 20px;
  font-size: 24px;

  &:hover {
    color: #ccc;
  }
`;

// Hamburger icon for mobile menu, shown only on small screens.
const HamburgerIcon = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: block;
    cursor: pointer;
    position: absolute;
    right: 20px;
    top: 26px;
    font-size: 17px;
  }
`;

// Navigation component with responsive design for displaying menu items.
const Navigation = styled.nav`
  display: flex;
  @media (max-width: 768px) {
    flex-direction: column;
    display: ${({ $isMenuOpen }) => ($isMenuOpen ? "flex" : "none")};
    order: 3;
    width: 100%;
    justify-content: center;
    align-items: center;
    padding-top: 10px;
  }

  ul {
    list-style: none;
    display: flex;
    margin: 0;
    padding: 0;

    @media (max-width: 768px) {
      flex-direction: column;
      align-items: center;
    }

    li {
      margin-right: 20px;

      @media (max-width: 768px) {
        margin-right: 0;
        margin-bottom: 10px;
        margin-bottom: 10px;
      }

      a {
        color: white;
        text-decoration: none;
        font-weight: bold;
        transition: color 0.3s ease-in-out;

        &:hover {
          color: #ccc;
        }
      }
    }
  }
`;

// Header functional component with state for toggling mobile menu.
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to control the mobile menu visibility.

  return (
    <HeaderContainer>
      <HamburgerIcon onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <FontAwesomeIcon icon={faBars} size="2x" />
      </HamburgerIcon>
      <Navigation $isMenuOpen={isMenuOpen}>
        <ul>
          {/* Navigation links that hide the menu on click in mobile view */}
          <li>
            <Link to="/" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={() => setIsMenuOpen(false)}>
              About
            </Link>
          </li>
          <li>
            <Link to="/resume" onClick={() => setIsMenuOpen(false)}>
              Resume
            </Link>
          </li>
          <li>
            <Link to="/portfolio" onClick={() => setIsMenuOpen(false)}>
              Portfolio
            </Link>
          </li>
          <li>
            <Link to="/chart" onClick={() => setIsMenuOpen(false)}>
              Chart
            </Link>
          </li>
        </ul>
      </Navigation>
      <a href="/">
        <Logo src={logoImg} alt="Logo" />
      </a>
      <SocialMediaWrapper $isMenuOpen={isMenuOpen}>
        <IconLink href="https://twitter.com/trvisXX" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faXTwitter} />
        </IconLink>
        <IconLink href="https://www.youtube.com/channel/UCtxdfwb9wfkoGocVUAJ-Bmg" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faYoutube} />
        </IconLink>
        <IconLink href="https://open.spotify.com/artist/0Y5tJX1MQlPlqiwlOH1tJY" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faSpotify} />
        </IconLink>
        <IconLink href="https://www.instagram.com/travisscott/" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faInstagram} />
        </IconLink>
        <IconLink href="https://www.facebook.com/travisscottlaflame" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faFacebookF} />
        </IconLink>
      </SocialMediaWrapper>
    </HeaderContainer>
  );
};

export default Header;
