import { storiesOf } from "@storybook/react";
import React from "react";

import FriendsEntry from ".";

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

storiesOf("FriendsEntry", module)
  .add("default", () => (
    <FriendsEntry friends={mockFriends}/>
  ));
