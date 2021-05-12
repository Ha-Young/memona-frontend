import { storiesOf } from "@storybook/react";
import React from "react";

import SeasonPicker from ".";

storiesOf("SeasonPicker", module)
  .add("default", () => (
    <SeasonPicker/>
  ))
  .add("isMobile", () => (
    <SeasonPicker isMobile/>
  ));
