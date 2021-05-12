import styled from "styled-components";
import { palette, size } from "styled-theme";

import FriendItem from "./item";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 1.5rem;
  width: 100%;
  max-width: ${size("friendsListWidth")};
  font-size: 1rem;
  color: ${palette("grayscale", 2)};
`;

const EntryWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  width: 80%;
  list-style: none;
`;

const FriendsEntry = ({ friends, ...props }) => {
  return (
    <Wrapper {...props}>
      친구 리스트
      <EntryWrapper>
        {friends.map((friend) => <FriendItem key={friend._id} friend={friend} />)}
      </EntryWrapper>
    </Wrapper>
  );
};

export default FriendsEntry;
