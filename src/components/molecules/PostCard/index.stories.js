import { storiesOf } from "@storybook/react";
import React from "react";

import PostCard from ".";

const mockData = {
  postDate: "2021-05-04",
  content: "테스트입니다. 테스트 포스트카드입니다.",
  author: {
    username: "testuser",
  },
};

storiesOf("PostCard", module)
  .add("default", () => (
    <PostCard post={mockData} width="640px"/>
  ));
