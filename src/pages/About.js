import React from "react";
import styled from "styled-components";
import aboutImage from "../images/about_image.webp";

const AboutContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: center;
  padding: 40px;
  gap: 40px; // イメージとテキスト間のスペースを調整
  min-height: 100vh;
  background-color: #f0f2f5; // 軽い背景色を追加
`;

const ImageContainer = styled.div`
  flex: 1;
  img {
    width: 100%;
    height: auto;
    border-radius: 12px; // 角の丸みを調整
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1); // 画像に影を追加
  }
`;

const DescriptionContainer = styled.div`
  flex: 1;
  font-size: 18px;
  color: #343a40; // テキストの色を調整
  line-height: 1.6; // 行間を調整

  h2 {
    color: #007bff; // セクションタイトルの色を調整
    margin-bottom: 16px; // タイトル下のマージンを調整
  }

  p {
    margin-bottom: 16px; // 段落間のマージンを調整
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
        {/* 必要に応じてさらに説明や要素を追加 */}
      </DescriptionContainer>
    </AboutContainer>
  );
};

export default About;
