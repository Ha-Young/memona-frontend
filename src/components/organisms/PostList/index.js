import React from "react";
import styled from "styled-components";
import { size } from "styled-theme";

import Label from "../../atoms/Label";
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

const EmptyPosts = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 150px;
`;

const PostList = ({ posts = [], areaName, ...props }) => {
  return (
    <Wrapper {...props}>
      {posts.length > 0 ? (
        posts.map((post) => <PostItem key={post._id} post={post} />)
      ) : (
        <EmptyPosts>
          <Label>{ areaName ? <b>{areaName}</b> : ""} 에 대한 포스트는 아직 없습니다.</Label>
          <Label>당신이 첫번째 포스트의 주인공이 되어보세요 :)</Label>
        </EmptyPosts>
      )}
    </Wrapper>
  );
};

export default PostList;
