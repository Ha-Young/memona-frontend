import React from "react";
import styled from "styled-components";
import { palette } from "styled-theme";

import Avatar from "../../atoms/Avatar";
import Icon from "../../atoms/Icon";

const Wrapper = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  color: ${palette("grayscale", 0)};
  cursor: pointer;
`;

const FriendName = styled.span`
  display: flex;
  justify-content: center;
  height: 100%;
  width: 55%;
`;

const StyledIcon = styled(Icon)`
  flex: none;
  margin-right: 10px;
  border: 1px solid ${palette("grayscale", 0)};
  border-radius: 50%;
`;

const FriendItem = ({ friend }) => {
  return (
    <Wrapper>
      {friend && friend.imageUrl ? <Avatar src={friend.imageUrl} alt={friend.username} /> : <StyledIcon icon="user" width={32} />}
      <FriendName>{friend.username}</FriendName>
    </Wrapper>
  );
};

export default FriendItem;
