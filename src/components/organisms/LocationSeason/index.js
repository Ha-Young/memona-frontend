import React from "react";
import styled from "styled-components";
import { palette, size } from "styled-theme";

import Button from "../../atoms/Button";
import LocationInfo from "../../molecules/LocationInfo";
import SeasonPicker from "../../molecules/SeasonPicker";

const ContentTop = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  margin-bottom: 2rem;
  height: 200px;
  background-color: ${palette("grayscale", 0, true)};
  border: 1px solid ${palette("grayscale", 5)};

  @media screen and (max-width: ${size("maxWidth")}) {
    margin-bottom: 1.5rem;
    padding: 0.5rem;
  }

  @media screen and (max-width: ${size("mobileWidth")}) {
    margin-bottom: 1rem;
    padding: 0;
    height: 180px;
  }
`;

const StyledButton = styled(Button)`
  position: absolute;
  bottom: 5px;
  right: 5px;
  z-index: 1;

  @media screen and (max-width: ${size("mobileWidth")}) {
    height: 24px;
    width: 28px;
    font-size: 0.6rem;
  }
`;
const LocationSeason = ({ onSeasonApplyBtnClick, areaName, yearValueRef, seasonValueRef, ...props }) => {
  return (
    <ContentTop {...props}>
      <LocationInfo areaName={areaName} />
      <SeasonPicker
        yearValueRef={yearValueRef}
        seasonValueRef={seasonValueRef}
      />
      <StyledButton height={30} onClick={onSeasonApplyBtnClick}>
        적용
      </StyledButton>
    </ContentTop>
  );
};

export default LocationSeason;
