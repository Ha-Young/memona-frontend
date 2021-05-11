import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import { size } from "styled-theme";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 3rem;
  min-height: 100vh;
  box-sizing: border-box;
  @media screen and (max-width: 640px) {
    padding-top: 2rem;
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
  width: 100%;
  box-sizing: border-box;
  margin: 2rem auto;
  max-width: ${size("maxWidth")};
`;

const Footer = styled.footer`
  margin-top: auto;
`;

const PageTemplate = ({
  header,
  children,
  footer,
  ...props
}) => {
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
