import { storiesOf } from "@storybook/react";
import React from "react";

import LocationInfo from ".";

storiesOf("LocationInfo", module)
  .add("default", () => (
    <LocationInfo
      areaName="역삼/선릉"
    />
  ));
