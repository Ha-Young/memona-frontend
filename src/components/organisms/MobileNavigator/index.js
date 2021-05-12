import React from "react";
import styled from "styled-components";
import { palette, size } from "styled-theme";

import PrimaryNavigation from "../../molecules/PrimaryNavigation";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem;
  height: 3.75rem;
  background-color: ${palette("grayscale", 0, true)};
  border-bottom: 1px solid ${palette("grayscale", 5)};
  box-sizing: border-box;

  @media screen and (max-width: ${size("mobileWidth")}) {
    height: 2.75rem;
  }
`;

const MobileNavigator = (props) => {
  return (
    <Wrapper {...props}>
      <PrimaryNavigation mobileType/>
    </Wrapper>
  );
};

export default MobileNavigator;
