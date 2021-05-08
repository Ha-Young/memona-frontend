import React from "react";
import styled from "styled-components";

import defaultImage from "../../assets/images/landingPhone.png";
import Img from "../../components/atoms/Img";
import AddToHomeForm from "../../components/molecules/AddToHomeForm";
import LoginForm from "../../components/molecules/LoginForm";
import GenericTemplate from "../../components/templates/GenericTemplate";

const LandingImages = styled.div`
  @media screen and (max-width: 640px) {
    display: none;
  }
`;

const LandingForms = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 350px;
  height: 580px;
`;

const LoginPage = () => {
  return (
    <GenericTemplate>
      <LandingImages>
        <Img alt="landingPhone" src={defaultImage} />
      </LandingImages>
      <LandingForms>
        <LoginForm
          title="Memona"
          information="당신의 추억의 위치를 기억하세요"
          height="480px"
        />
        <AddToHomeForm
          height="180px"
        />
      </LandingForms>
    </GenericTemplate>
  );
};

export default LoginPage;
