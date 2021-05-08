import { storiesOf } from "@storybook/react";
import React from "react";

import defaultImage from "../../../assets/images/landingPhone.png";
import Img from ".";

storiesOf("Img", module)
  .add("default", () => (
    <Img
      alt="landingPhone"
      src={defaultImage}
    />
  ))
  .add("width height", () => (
    <Img
      alt="landingPhone"
      src={defaultImage}
      width="400px"
      height="600px"
    />
  ));
