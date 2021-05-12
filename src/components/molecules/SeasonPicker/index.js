import React, { useRef } from "react";
import styled from "styled-components";
import { palette } from "styled-theme";
import { ifProp, prop } from "styled-tools";

import generateYearList from "../../../utils/generateYearList";
import Button from "../../atoms/Button";
import RotatingPicker from "../../atoms/RotatingPicker";

const Wrapper = styled.div`
  position: relative;
  margin: 0 auto;
  height: ${ifProp("isMobile", "170px", "200px")};
  width: ${ifProp("isMobile", "230px", "300px")};
  max-width: 300px;
  background-color: ${palette("grayscale", 0, true)};
  z-index: 0;
`;

const Wheels = styled.div`
  position: relative;
  display: flex;
  margin-left: auto;
  margin-right: auto;
  padding-left: 10px;
  width: 100%;
  height: 100%;
  max-width: 300px;
  background-color: ${palette("grayscale", 0, true)};
`;

const StyledButton = styled(Button)`
  position: absolute;
  bottom : 5px;
  right: 5px;
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

const SeasonPicker = ({ isMobile, ...props }) => {
  console.log("isMobile", isMobile);
  const yearValueRef = useRef();
  const seasonValueRef = useRef();

  const fontSize = isMobile ? ".8rem" : ".9rem";
  const btnSize = isMobile ? 20 : 25;

  function handleApplyBtnClick() {
    console.log(yearValueRef.current);
    console.log(seasonValueRef.current);
  }

  return (
    <Wrapper isMobile={!!isMobile} {...props}>
      <Wheels>
        <div className="embla__wheels__shadow embla__wheels__shadow--start" />
        <div className="embla__wheels__shadow embla__wheels__shadow--end" />
        <RotatingPicker
          slides={years}
          perspective="left"
          loop={true}
          label=""
          valueRef={yearValueRef}
          fontSize={fontSize}
        />
        <RotatingPicker
          slides={seasons}
          perspective="right"
          loop={true}
          label=""
          valueRef={seasonValueRef}
          fontSize={fontSize}
        />
      </Wheels>
      <StyledButton height={btnSize} onClick={handleApplyBtnClick}>적용</StyledButton>
    </Wrapper>
  );
};

export default SeasonPicker;
