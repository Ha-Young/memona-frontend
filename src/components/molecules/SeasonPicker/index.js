import React, { useRef } from "react";
import styled from "styled-components";
import { palette } from "styled-theme";

import generateYearList from "../../../utils/generateYearList";
import Button from "../../atoms/Button";
import RotatingPicker from "../../atoms/RotatingPicker";

const Wrapper = styled.div`
  position: relative;
  padding-left: 20px;
  padding-right: 10px;
  margin-left: auto;
  margin-right: auto;
  height: 200px;
  max-width: 470px;
  background-color: ${palette("grayscale", 0, true)};
`;

const Wheels = styled.div`
  position: relative;
  display: flex;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  height: 100%;
  max-width: 300px;
  background-color: ${palette("grayscale", 0, true)};
`;

const StyledButton = styled(Button)`
  position: absolute;
  bottom : 5px;
  right: 100px;
  z-index: 1;
`;

const years = generateYearList(50);
const seasons = [
  "Spring",
  "Summer",
  "Autumn",
  "Winter",
  "Spring",
  "Summer",
  "Autumn",
  "Winter"
];

const SeasonPicker = ({ post, ...props }) => {
  const yearValueRef = useRef();
  const seasonValueRef = useRef();

  function handleApplyBtnClick() {
    console.log(yearValueRef.current);
    console.log(seasonValueRef.current);
  }

  return (
    <Wrapper>
      <Wheels>
        <RotatingPicker
          slides={years}
          perspective="left"
          loop={true}
          label=""
          valueRef={yearValueRef}
        />
        <RotatingPicker
          slides={seasons}
          perspective="left"
          loop={true}
          label=""
          valueRef={seasonValueRef}
        />
      </Wheels>
      <StyledButton height={25} onClick={handleApplyBtnClick}>적용</StyledButton>
    </Wrapper>
  );
};

export default SeasonPicker;
