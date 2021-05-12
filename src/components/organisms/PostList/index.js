import React from "react";
import styled from "styled-components";
import { size } from "styled-theme";

import PostCard from "../../molecules/PostCard";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const PostItem = styled(PostCard)`
  &:not(:last-child) {
    margin-bottom: 2.5rem;
  }

  @media (max-width: ${size("maxWidth")}) {
    &:not(:last-child) {
      margin-bottom: 1.75rem;
    }
  }
`;

const PostList = ({ posts = [], ...props }) => {
  return (
    <Wrapper {...props}>
      {posts.map((post) => (
        <PostItem post={post} />
      ))}
    </Wrapper>
  );
};

export default PostList;
