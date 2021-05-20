import React from "react";
import styled from "styled-components";
import { palette } from "styled-theme";

import capitalize from "../../../utils/capitalize";
import Avatar from "../../atoms/Avatar";
import Icon from "../../atoms/Icon";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const StyledAvatar = styled(Avatar)`
  margin-right: 10px;
`;

const StyledIcon = styled(Icon)`
  flex: none;
  margin-right: 10px;
  border: 1px solid ${palette("grayscale", 0)};
  border-radius: 50%;
`;

const PostTitleContent = styled.span`
  display: flex;
  align-items: center;
  padding-top: 0.2rem;
  box-sizing: border-box;
`;

const SeasonInfo = styled.span`
  font-size: 1.1rem;
`;

const AreaInfo = styled.span`
  margin-right: .5rem;
  font-size: 0.8rem;
`;

const PostTitle = ({ post, ...props }) => {
  return (
    <Wrapper {...props}>
      <PostTitleContent>
        {post.isAnonymous || post.author?.imageUrl ? (
          <StyledAvatar src={post.author.imageUrl} alt={post.author.username} />
        ) : (
          <StyledIcon icon="user" width={32} />
        )}
        <SeasonInfo>{`${post.year} ${capitalize(post.season)}`}</SeasonInfo>
      </PostTitleContent>
      <AreaInfo>{post.area}</AreaInfo>
    </Wrapper>
  );
};

export default PostTitle;
