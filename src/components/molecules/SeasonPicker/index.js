import React, { useRef } from "react";
import styled from "styled-components";
import { palette, size } from "styled-theme";
import { prop } from "styled-tools";

import generateYearList from "../../../utils/generateYearList";
import Button from "../../atoms/Button";
import RotatingPicker from "../../atoms/RotatingPicker";

const Wrapper = styled.div`
  position: relative;
  margin: 0 auto;
  height: ${prop("height", "200px")};
  width: ${prop("width", "300px")};
  max-width: 300px;
  background-color: ${palette("grayscale", 0, true)};
  z-index: 0;

  @media screen and (max-width: ${size("maxWidth")}) {
    height: 180px;
    width: 250px;
  }

  @media screen and (max-width: ${size("mobileWidth")}) {
    height: 160px;
    width: 220px;
  }
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

const SeasonPicker = ({ yearValueRef, seasonValueRef, ...props }) => {
  return (
    <Wrapper {...props}>
      <Wheels>
        <div className="embla__wheels__shadow embla__wheels__shadow--start" />
        <div className="embla__wheels__shadow embla__wheels__shadow--end" />
        <RotatingPicker
          slides={years}
          perspective="left"
          loop={true}
          label=""
          valueRef={yearValueRef}
        />
        <RotatingPicker
          slides={seasons}
          perspective="right"
          loop={true}
          label=""
          valueRef={seasonValueRef}
        />
      </Wheels>
    </Wrapper>
  );
};

export default SeasonPicker;
