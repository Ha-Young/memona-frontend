import { gql, useMutation } from "@apollo/client";
import React from "react";
import { Redirect } from "react-router";
import styled from "styled-components";
import { size } from "styled-theme";

import defaultImage from "../../assets/images/landingPhone.png";
import Img from "../../components/atoms/Img";
import AddToHomeForm from "../../components/molecules/AddToHomeForm";
import LoginForm from "../../components/molecules/LoginForm";
import GenericTemplate from "../../components/templates/GenericTemplate";
import useToken from "../../hooks/useToken";

const LandingImages = styled.div`
  @media screen and (max-width: ${size("mobileWidth")}) {
    display: none;
  }
`;

const LandingForms = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 350px;
  height: 580px;

  @media screen and (max-width: 840px) {
    padding-right: 2rem;
  }

  @media screen and (max-width: ${size("mobileWidth")}) {
    padding-right: 0;
  }
`;

const LOGIN_USER = gql`
  mutation LoginMutation(
    $type: String
    $token: String
    $email: String
    $password: String
  ) {
    login(
      type: $type
      token: $token
      email: $email
      password: $password
    )
  }
`;

const LoginPage = () => {
  const [login] = useMutation(LOGIN_USER, { onCompleted: handleLoginSuccess, onError: handleLoginFailure });
  const { token, setToken } = useToken();

  function handleLoginSuccess({ login }) {
    setToken(login);
  }

  function handleLogin(loginData) {
    login({ variables: { ...loginData } });
  }

  function handleLoginFailure(error) {
    // todo. error handling
    console.log(error);
  }

  return (
    <>
      <GenericTemplate>
        <LandingImages>
          <Img alt="landingPhone" src={defaultImage} />
        </LandingImages>
        <LandingForms>
          <LoginForm
            title="Memona"
            information="당신의 추억의 위치를 기억하세요"
            height="480px"
            onLogin={handleLogin}
            onLoginFailure={handleLoginFailure}
          />
          <AddToHomeForm height="180px" />
        </LandingForms>
      </GenericTemplate>
      {token && <Redirect to="/" />}
    </>
  );
};

export default LoginPage;
