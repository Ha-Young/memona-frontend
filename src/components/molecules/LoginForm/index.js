import React from "react";
import styled from "styled-components";
import { palette } from "styled-theme";
import { prop } from "styled-tools";

import GoogleLoginButton from "../../atoms/GoogleLoginButton";
import Heading from "../../atoms/Heading";
import Label from "../../atoms/Label";

const borderColor = palette("grayscale", 0);

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 0 3rem;
  width: ${prop("width", "auto")};
  height: ${prop("height", "auto")};
  border: 1px solid ${borderColor};
  box-sizing: border-box;

  @media screen and (max-width: 640px) {
    padding: 0.5rem;
    border: none;
  }
`;

const StyledHeading = styled(Heading)`
  @media screen and (max-width: 640px) {
    font-size: 2.5rem;
  }
`;

const StyledLabel = styled(Label)`
  margin-bottom: 40px;
`;

const LoginForm = ({
  title,
  information,
  onLoginSuccess,
  onLoginFailure,
  ...props
}) => {
  return (
    <Wrapper {...props}>
      <StyledHeading level={1}>{title}</StyledHeading>
      <StyledLabel>{information}</StyledLabel>
      <GoogleLoginButton
        onSuccess={onLoginSuccess}
        onFailure={onLoginFailure}
      />
    </Wrapper>
  );
};

export default LoginForm;
