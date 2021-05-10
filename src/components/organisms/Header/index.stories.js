import { storiesOf } from "@storybook/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";

import Header from ".";

storiesOf("Header", module).add("default", () => (
  <BrowserRouter>
    <Header />
  </BrowserRouter>
));
