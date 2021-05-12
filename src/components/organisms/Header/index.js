import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { palette, size } from "styled-theme";

import Heading from "../../atoms/Heading";
import PrimaryNavigation from "../../molecules/PrimaryNavigation";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem;
  background-color: ${palette("grayscale", 0, true)};
  border: 1px solid ${palette("grayscale", 4)};

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
  }
`;

const Header = (props) => {
  return (
    <Wrapper {...props}>
      <InnerWrapper>
        <Link to="/">
          <Heading level={1} margin={0}>
            Memona
          </Heading>
        </Link>
        <PrimaryNavigation />
      </InnerWrapper>
    </Wrapper>
  );
};

export default Header;
