import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { size } from "styled-theme";

import Heading from "../../atoms/Heading";
import PrimaryNavigation from "../../molecules/PrimaryNavigation";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem;
  height: 3.75rem;
  box-sizing: border-box;
  z-index: 2;
`;

const InnerWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: ${size("maxWidth")};

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
