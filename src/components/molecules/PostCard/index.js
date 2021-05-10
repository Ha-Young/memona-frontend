import React from "react";
import styled from "styled-components";
import { palette } from "styled-theme";
import { ifProp } from "styled-tools";

import defaultImg from "../../../assets/images/examplePostImage.jpeg";
import Icon from "../../atoms/Icon";
import Img from "../../atoms/Img";

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 614px;
  border: 1px solid ${palette("grayscale", 4)};
  box-sizing: border-box;
  opacity: ${ifProp("soon", 0.4, 1)};
  @media screen and (max-width: 614px) {
    padding: 0.5rem;
    width: 100%;
  }
`;

const StyledIcon = styled(Icon)`
  flex: none;
  margin-right: 10px;
  border: 1px solid ${palette("grayscale", 0)};
  border-radius: 50%;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  padding: .5rem;
  width: 100%;
  border-bottom: 1px solid ${palette("grayscale", 4)};
  font-size: 1.2rem;
  box-sizing: border-box;
`;

const ImageWrapper = styled.div`
  max-width: 614px;
  max-height: 614px;
  width: 100%;
  height: 100%;
`;

const ContentWrapper = styled.div`
  min-height: 100px;
`;

const ContentIconWrapper = styled.div`
  display: flex;
  padding: .5rem;
  width: 200px;
  svg {
    cursor: pointer;
  }
`;

const ContentTextWrapper = styled.div`
  padding: .5rem 1rem;
`;

const PostCard = ({ userImgUrl, postDate, postImageUrl, content, ...props }) => {
  const imgSrc = postImageUrl || defaultImg;
  return (
    <Wrapper {...props}>
      <Header>
        {userImgUrl || <StyledIcon icon="user" width={32} />}
        {postDate}
      </Header>
      <ImageWrapper>
        <Img src={imgSrc} width="100%" height="100%" />
      </ImageWrapper>
      <ContentWrapper>
        <ContentIconWrapper>
          <Icon width={32}/>
          <Icon width={32}/>
        </ContentIconWrapper>
        <ContentTextWrapper>
          {content}
        </ContentTextWrapper>
      </ContentWrapper>
    </Wrapper>
  );
};

export default PostCard;
