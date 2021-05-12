import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import { size } from "styled-theme";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 3.75rem;
  min-height: 100vh;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.genericBackgroundColor};

  @media screen and (max-width: 640px) {
    padding-top: 1.75rem;
  }
`;

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1;
`;

const Content = styled.section`
  display: flex;
  width: 100%;
  box-sizing: border-box;
  margin: 2rem auto;
  max-width: ${size("maxWidth")};

  @media screen and (max-width: ${size("maxWidth")}) {
    padding-top: 1.75rem;
    margin: 0;
    justify-content: center;
  }
`;

const Footer = styled.footer`
  margin-top: auto;
`;

const PageTemplate = ({ viewMode, header, mobileHeader, mobileNavigator, children, footer, onResize, ...props }) => {
  return (
    <Wrapper {...props}>
      <Header>{header}</Header>
      <Content>{children}</Content>
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
