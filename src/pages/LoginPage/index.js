import { useMutation } from "@apollo/client";
import React, { useEffect, useRef } from "react";
import { Redirect } from "react-router";
import styled from "styled-components";
import { size } from "styled-theme";

import defaultImage from "../../assets/images/landingPhone.png";
import Img from "../../components/atoms/Img";
import AddToHomeForm from "../../components/molecules/AddToHomeForm";
import LoginForm from "../../components/molecules/LoginForm";
import GenericTemplate from "../../components/templates/GenericTemplate";
import useToken from "../../hooks/useToken";
import { LOGIN_USER } from "./query";

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

const LoginPage = () => {
  const [login, { error, loading }] = useMutation(LOGIN_USER, { onCompleted: handleLoginSuccess, onError: handleLoginFailure });
  const { token, setToken } = useToken();
  const deferredInstallPromptRef = useRef(null);

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

  async function handleAddToHomeBtnClick() {
    console.log("here");
    const deferredInstallPrompt = deferredInstallPromptRef.current;

    if (deferredInstallPrompt) {
      deferredInstallPrompt.prompt();

      const choice = await deferredInstallPrompt.userChoice;

      if (choice.outcome === "accepted") {
        console.log("User accepted the A2HS prompt", choice);
      } else {
        console.log("User dismissed the A2HS prompt", choice);
      }
      deferredInstallPrompt.userChoice = null;
    }
  }

  useEffect(() => {
    console.log("9");
    function handleBeforeInstallPrompt(evt) {
      console.log("hoho", evt);
      deferredInstallPromptRef.current = evt;
    }
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  });

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
          <AddToHomeForm height="180px" onAddToHomeBtnClick={handleAddToHomeBtnClick}/>
        </LandingForms>
      </GenericTemplate>
      {token && <Redirect to="/" />}
    </>
  );
};

export default LoginPage;
