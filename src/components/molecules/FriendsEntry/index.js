import styled from "styled-components";
import { palette } from "styled-theme";

import FriendItem from "./item";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  width: 100%;
  max-width: 300px;
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
        {friends.map((friend) => <FriendItem friend={friend} />)}
      </EntryWrapper>
    </Wrapper>
  );
};

export default FriendsEntry;
