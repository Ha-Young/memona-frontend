import { storiesOf } from "@storybook/react";
import React from "react";

import FriendsList from ".";

const mockFriends = [
  {
    _id: 1,
    username: "test1",
    imageUrl: "https://lh3.googleusercontent.com/a/AATXAJyu9yYaEXDkC30xWzNlO59Uhzdyt_ELAuinPyY1=s96-c",
  },
  {
    _id: 2,
    username: "test2",
    imageUrl: "https://lh3.googleusercontent.com/a/AATXAJyu9yYaEXDkC30xWzNlO59Uhzdyt_ELAuinPyY1=s96-c",
  },
  {
    _id: 3,
    username: "test3",
    imageUrl: "https://lh3.googleusercontent.com/a/AATXAJyu9yYaEXDkC30xWzNlO59Uhzdyt_ELAuinPyY1=s96-c",
  },
  {
    _id: 4,
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
