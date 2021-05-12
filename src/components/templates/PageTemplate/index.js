import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import { palette, size } from "styled-theme";

import { viewType as viewTypeConstant } from "../../../constants";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 3.75rem;
  min-height: 100vh;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.genericBackgroundColor};

  @media screen and (max-width: ${size("maxWidth")}) {
    padding: 2.75rem 0;
  }

  @media screen and (max-width: ${size("mobileWidth")}) {
    padding: 1.75rem 0;
  }
`;

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1;
  background-color: ${palette("grayscale", 0, true)};
  border-bottom: 1px solid ${palette("grayscale", 5)};
`;

const Content = styled.section`
  display: flex;
  width: 100%;
  box-sizing: border-box;
  margin: 2rem auto;
  max-width: ${size("maxWidth")};

  @media screen and (max-width: ${size("maxWidth")}) {
    margin: 1.5rem 0;
    justify-content: center;
  }
`;

const Footer = styled.footer`
  margin-top: auto;
`;

const MobileNavigator = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 1;
  background-color: ${palette("grayscale", 0, true)};
  border-top: 1px solid ${palette("grayscale", 5)};
`;

const PageTemplate = ({
  viewMode,
  header,
  mobileHeader,
  mobileNavigator,
  children,
  footer,
  onResize,
  ...props
}) => {
  const viewType = viewMode.viewType;

  return (
    <Wrapper {...props}>
      <Header>
        {viewType === viewTypeConstant.MOBILE ? mobileHeader : header}
      </Header>
      <Content>{children}</Content>
      {viewType === viewTypeConstant.MOBILE && (
        <MobileNavigator>{mobileNavigator}</MobileNavigator>
      )}
      {footer && <Footer>{footer}</Footer>}
    </Wrapper>
  );
};

PageTemplate.propTypes = {
  header: PropTypes.node.isRequired,
  footer: PropTypes.node,
  children: PropTypes.any.isRequired,
};

export default PageTemplate;
