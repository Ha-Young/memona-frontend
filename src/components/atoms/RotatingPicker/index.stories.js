import { storiesOf } from "@storybook/react";
import React from "react";

import generateYearList from "../../../utils/generateYearList";
import RotatingPicker from ".";

const slides = generateYearList(50);
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

storiesOf("RotatingPicker", module)
  .add("default", () => (
    <div className="embla">
      <div className="embla__wheels">
        <RotatingPicker
          slides={24}
          perspective="left"
          loop={false}
          label="hours"
        />
      </div>
    </div>
  ))
  .add("years", () => (
    <div className="embla">
      <div className="embla__wheels">
        <RotatingPicker
          slides={slides}
          perspective="left"
          loop={true}
          label="years"
        />
      </div>
    </div>
  ))
  .add("seasons", () => (
    <div className="embla">
      <div className="embla__wheels">
        <RotatingPicker slides={seasons} perspective="left" loop={true} />
      </div>
    </div>
  ))
  .add("fontSize", () => (
    <div className="embla">
      <div className="embla__wheels">
        <RotatingPicker slides={seasons} perspective="left" loop={true} fontSize=".9rem" />
      </div>
    </div>
  ));
