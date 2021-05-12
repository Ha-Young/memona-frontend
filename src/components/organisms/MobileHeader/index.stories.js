import { storiesOf } from "@storybook/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";

import MobileHeader from ".";

storiesOf("MobileHeader", module).add("default", () => (
  <BrowserRouter>
    <MobileHeader />
  </BrowserRouter>
));
