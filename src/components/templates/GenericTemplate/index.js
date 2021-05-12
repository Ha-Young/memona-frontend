import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import { size } from "styled-theme";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: ${({ theme }) => theme.genericBackgroundColor};
  box-sizing: border-box;

  @media (orientation: landscape) and (max-width: 640px),
    (orientation: landscape) and (max-height: 620px) {
    height: auto;
  }
`;

const Content = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  box-sizing: border-box;
  margin: 0 auto;
  max-width: ${size("maxWidth")};
`;

const GenericTemplate = ({ children, ...props }) => {
  return (
    <Wrapper {...props}>
      <Content>{children}</Content>
    </Wrapper>
  );
};

GenericTemplate.propTypes = {
  children: PropTypes.any.isRequired,
};

export default GenericTemplate;
