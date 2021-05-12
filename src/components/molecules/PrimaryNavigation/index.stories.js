import { storiesOf } from "@storybook/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";

import PrimaryNavigation from ".";

storiesOf("PrimaryNavigation", module)
  .add("default", () => (
    <BrowserRouter>
      <PrimaryNavigation />
    </BrowserRouter>
  ))
  .add("reverse", () => (
    <BrowserRouter>
      <PrimaryNavigation reverse />
    </BrowserRouter>
  ))
  .add("mobileType", () => (
    <BrowserRouter>
      <PrimaryNavigation mobileType />
    </BrowserRouter>
  ));
