import React from "react";
import styled from "styled-components";

import PostCard from "../../molecules/PostCard";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const PostItem = styled(PostCard)`
  margin-bottom: 20px;

  @media (min-width: 640px) {
    margin-bottom: 60px;
  }

  @media (max-width: 735px) {
    margin-bottom: 15px;
  }
`;

const PostList = ({ posts = [], ...props }) => {
  return (
    <Wrapper {...props}>
      {posts.map((post) => <PostItem post={post} />)}
    </Wrapper>
  );
};

export default PostList;
