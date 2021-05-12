import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { palette, size } from "styled-theme";

import Heading from "../../atoms/Heading";
import Icon from "../../atoms/Icon";
import PrimaryNavigation from "../../molecules/PrimaryNavigation";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem;
  height: 3.75rem;
  background-color: ${palette("grayscale", 0, true)};
  border-bottom: 1px solid ${palette("grayscale", 5)};
  box-sizing: border-box;

  @media screen and (max-width: 640px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
    width: 100%;
    height: 44px;
  }
`;

const InnerWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: ${size("maxWidth")};
  > :not(:first-child) {
    margin-left: 1rem;
  }

  a {
    text-decoration: none;
    color: ${palette("grayscale", 0)};

    &.active {
      color: ${palette("grayscale", 0)};
    }
  }
`;

const MobileHeader = (props) => {
  return (
    <Wrapper {...props}>
      <InnerWrapper>
        <Link to="/">
          <Icon icon="camera" size={25}/>
        </Link>
        <Link to="/">
          <Heading level={1} margin={0}>
            Memona
          </Heading>
        </Link>
        <Link to="/">
          <Icon icon="friends" size={25}/>
        </Link>
      </InnerWrapper>
    </Wrapper>
  );
};

export default MobileHeader;
