import React from "react";
import styled from "styled-components";

import Icon from "../../atoms/Icon";

const Wrapper = styled.div`
`;

const ContentIconWrapper = styled.div`
  display: flex;
  padding: 0.5rem;
  width: 200px;
  span {
    margin-right: 5px;
  }
  svg {
    cursor: pointer;
  }
`;

const ContentTextWrapper = styled.div`
  padding: 0.5rem 1rem;
`;

const PostContent = ({ post, ...props }) => {
  return (
    <Wrapper {...props}>
      <ContentIconWrapper>
        <Icon icon="heartLine" width={32} />
        <Icon icon="comment" width={32} />
      </ContentIconWrapper>
      <ContentTextWrapper>{post.content}</ContentTextWrapper>
    </Wrapper>
  );
};

export default PostContent;
