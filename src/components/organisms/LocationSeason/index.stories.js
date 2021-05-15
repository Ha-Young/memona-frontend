import { storiesOf } from "@storybook/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";

import LocationSeason from ".";

storiesOf("LocationSeason", module).add("default", () => (
  <BrowserRouter>
    <LocationSeason />
  </BrowserRouter>
));
