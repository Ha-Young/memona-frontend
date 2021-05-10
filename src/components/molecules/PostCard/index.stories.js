import { storiesOf } from "@storybook/react";
import React from "react";

import PostCard from ".";

storiesOf("PostCard", module)
  .add("default", () => (
    <PostCard postDate="2021-05-04" content="테스트입니다. 테스트 포스트카드입니다."/>
  ));
