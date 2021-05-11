import React from "react";
import styled from "styled-components";
import { palette } from "styled-theme";

import Avatar from "../../atoms/Avatar";
import Icon from "../../atoms/Icon";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
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

const PostTitle = ({ post, ...props }) => {
  return (
    <Wrapper {...props}>
      {post.author ? (
        <StyledAvatar src={post.author.imageUrl} alt={post.author.username} />
      ) : (
        <StyledIcon icon="user" width={32} />
      )}
      {post.postDate}
    </Wrapper>
  );
};

export default PostTitle;
