import React from "react";
import styled from "styled-components";
import { palette, size } from "styled-theme";
import { prop } from "styled-tools";

import Avatar from "../../atoms/Avatar";
import Icon from "../../atoms/Icon";
import FriendsEntry from "../../molecules/FriendsEntry";

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: ${prop("width", size("friendsListWidth"))};
  box-sizing: border-box;
`;

const StyledIcon = styled(Icon)`
  flex: none;
  margin-right: 50px;
  border: 1px solid ${palette("grayscale", 0)};
  border-radius: 50%;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  padding: 0.5rem 0.5rem 1.5rem 3rem;
  width: 100%;
  border-bottom: 1px solid ${palette("grayscale", 5)};
  font-size: 1.2rem;
  box-sizing: border-box;
  cursor: pointer;
  img {
    margin-right: 50px;
  }
`;

const UserName = styled.span`
  margin-left: 10px;
`;

const FriendsList = ({ user, ...props }) => {
  return (
    <>
      {user ? (
        <Wrapper {...props}>
          <Header>
            {user ? (
              <Avatar src={user.imageUrl} alt={user.username} size={"48px"} />
            ) : (
              <StyledIcon icon="user" width={48} />
            )}
            <UserName>{user.username}</UserName>
          </Header>
          <FriendsEntry friends={user.friends} />
        </Wrapper>
      ) : null}
    </>
  );
};

export default FriendsList;
