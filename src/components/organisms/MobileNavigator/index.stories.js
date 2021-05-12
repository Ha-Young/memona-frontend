import { storiesOf } from "@storybook/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";

import MobileNavigator from ".";

storiesOf("MobileNavigator", module).add("default", () => (
  <BrowserRouter>
    <MobileNavigator />
  </BrowserRouter>
));
