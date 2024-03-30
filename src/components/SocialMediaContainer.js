import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter, faYoutube, faSpotify, faInstagram, faFacebookF } from "@fortawesome/free-brands-svg-icons";

const SocialMediaWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const IconLink = styled.a`
  color: white;
  margin-left: 20px;
  font-size: 24px;

  &:hover {
    color: #ccc;
  }
`;

const SocialMediaContainer = () => (
  <SocialMediaWrapper>
    <IconLink href="https://twitter.com/trvisXX" target="_blank" rel="noopener noreferrer">
      <FontAwesomeIcon icon={faXTwitter} />
    </IconLink>
    <IconLink href="https://www.youtube.com/channel/UCtxdfwb9wfkoGocVUAJ-Bmg" target="_blank" rel="noopener noreferrer">
      <FontAwesomeIcon icon={faYoutube} />
    </IconLink>
    <IconLink href="https://open.spotify.com/intl-ja/artist/0Y5tJX1MQlPlqiwlOH1tJY" target="_blank" rel="noopener noreferrer">
      <FontAwesomeIcon icon={faSpotify} />
    </IconLink>
    <IconLink href="https://www.instagram.com/travisscott/" target="_blank" rel="noopener noreferrer">
      <FontAwesomeIcon icon={faInstagram} />
    </IconLink>
    <IconLink href="https://www.facebook.com/travisscottlaflame/" target="_blank" rel="noopener noreferrer">
      <FontAwesomeIcon icon={faFacebookF} />
    </IconLink>
  </SocialMediaWrapper>
);

export default SocialMediaContainer;
