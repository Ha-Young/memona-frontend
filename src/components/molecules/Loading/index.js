import React from "react";
import Lottie from "react-lottie";
import styled from "styled-components";
import { size } from "styled-theme";

import LoadingAnim from "./loadingAnimation.json";

const LoadingWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  z-index: 1;

  background-color: rgba(255, 255, 255, 0);
`;

const StyledLoading = styled.div`
  width: 20vw;
  height: 20vw;
  @media screen and (max-width: ${size("mobileWidth")}) {
    width: 30vw;
    height: 30vw;
  }
`;

const lottieOptions = {
  animationData: LoadingAnim,
  loop: true,
  autoplay: true,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

function Loading() {
  return (
    <LoadingWrapper>
      <StyledLoading>
        <Lottie
          options={lottieOptions}
        />
      </StyledLoading>
    </LoadingWrapper>
  );
}

export default Loading;
