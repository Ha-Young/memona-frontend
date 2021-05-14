import { storiesOf } from "@storybook/react";
import React from "react";

import defaultImg from "../../../assets/images/examplePostImage.jpeg";
import PostList from ".";

const mockPosts = [
  {
    _id: 1,
    postDate: "2021-05-30",
    author: {
      imageUrl: "https://lh3.googleusercontent.com/a/AATXAJwtCFYAlDYjooMIEVhBD8VZsJ35X164RKn034hc=s96-c",
      postImageUrl: defaultImg,
    },
    content: "테스트입니다. 테스트 posts mock 데이터입니다",
  },
  {
    _id: 2,
    postDate: "2021-05-30",
    author: {
      imageUrl: "https://lh3.googleusercontent.com/a/AATXAJwtCFYAlDYjooMIEVhBD8VZsJ35X164RKn034hc=s96-c",
      postImageUrl: defaultImg,
    },
    content: "테스트입니다. 테스트 posts mock 데이터입니다",
  },
  {
    _id: 3,
    postDate: "2021-05-30",
    author: {
      imageUrl: "https://lh3.googleusercontent.com/a/AATXAJwtCFYAlDYjooMIEVhBD8VZsJ35X164RKn034hc=s96-c",
      postImageUrl: defaultImg,
    },
    content: "테스트입니다. 테스트 posts mock 데이터입니다",
  },
  {
    _id: 4,
    postDate: "2021-05-30",
    author: {
      imageUrl: "https://lh3.googleusercontent.com/a/AATXAJwtCFYAlDYjooMIEVhBD8VZsJ35X164RKn034hc=s96-c",
      postImageUrl: defaultImg,
    },
    content: "테스트입니다. 테스트 posts mock 데이터입니다",
  }
];

storiesOf("PostList", module)
  .add("default", () => (
    <PostList areaName="역삼동" posts={mockPosts}/>
  ))
  .add("empty post list", () => (
    <PostList areaName="역삼동" posts={[]}/>
  ));
