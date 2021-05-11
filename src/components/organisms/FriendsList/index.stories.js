import { storiesOf } from "@storybook/react";
import React from "react";

import FriendsList from ".";

const mockFriends = [
  {
    username: "test1",
  },
  {
    username: "test2",
  },
  {
    username: "test3",
  },
  {
    username: "test4",
  }
];

storiesOf("FriendsList", module)
  .add("default", () => (
    <FriendsList userName="로그인유저" friends={mockFriends}/>
  ));
