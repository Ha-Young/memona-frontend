import React from "react";
import styled from "styled-components";
import { palette } from "styled-theme";

import PrimaryNavigation from "../../molecules/PrimaryNavigation";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem;
  height: 3.75rem;
  background-color: ${palette("grayscale", 0, true)};
  border-bottom: 1px solid ${palette("grayscale", 5)};
  box-sizing: border-box;
`;

const MobileNavigator = ({ onCameraBtnClick, onImageUploadBtnClick, ...props }) => {
  return (
    <Wrapper {...props}>
      <PrimaryNavigation onCameraBtnClick={onCameraBtnClick} onImageUploadBtnClick={onImageUploadBtnClick} mobileType />
    </Wrapper>
  );
};

export default MobileNavigator;
