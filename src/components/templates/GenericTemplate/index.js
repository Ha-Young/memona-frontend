import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: ${({ theme }) => theme.genericBackgroundColor};
  box-sizing: border-box;
`;

const Content = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  box-sizing: border-box;
  margin: 0 auto;
  width: 80vw;
  min-width: 980px;
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
