import { storiesOf } from "@storybook/react";
import React from "react";

import PostContent from ".";

const mockData = {
  postDate: "2021-05-04",
  content: "테스트입니다. 테스트 포스트카드입니다.",
  author: {
    username: "testuser",
    imageUrl: "https://lh3.googleusercontent.com/a/AATXAJwtCFYAlDYjooMIEVhBD8VZsJ35X164RKn034hc=s96-c",
  },
};

storiesOf("PostContent", module)
  .add("default", () => (
    <PostContent
      post={mockData}
    />
  ));
