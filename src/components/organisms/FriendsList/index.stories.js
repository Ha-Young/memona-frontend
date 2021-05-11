import { storiesOf } from "@storybook/react";
import React from "react";

import FriendsList from ".";

const mockFriends = [
  {
    username: "test1",
    imageUrl: "https://lh3.googleusercontent.com/a/AATXAJyu9yYaEXDkC30xWzNlO59Uhzdyt_ELAuinPyY1=s96-c",
  },
  {
    username: "test2",
    imageUrl: "https://lh3.googleusercontent.com/a/AATXAJyu9yYaEXDkC30xWzNlO59Uhzdyt_ELAuinPyY1=s96-c",
  },
  {
    username: "test3",
    imageUrl: "https://lh3.googleusercontent.com/a/AATXAJyu9yYaEXDkC30xWzNlO59Uhzdyt_ELAuinPyY1=s96-c",
  },
  {
    username: "test4",
    imageUrl: "https://lh3.googleusercontent.com/a/AATXAJyu9yYaEXDkC30xWzNlO59Uhzdyt_ELAuinPyY1=s96-c",
  }
];

const mockUser = {
  username: "테스트유저",
  imageUrl: "https://lh3.googleusercontent.com/a/AATXAJyu9yYaEXDkC30xWzNlO59Uhzdyt_ELAuinPyY1=s96-c",
  friends: mockFriends,
};

storiesOf("FriendsList", module)
  .add("default", () => (
    <FriendsList user={mockUser} />
  ));
