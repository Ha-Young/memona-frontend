import { storiesOf } from "@storybook/react";
import React from "react";

import AddToHomeForm from ".";

storiesOf("AddToHomeForm", module)
  .add("default", () => (
    <AddToHomeForm
      onAddToHomeBtnClick={() => {console.log("add to home btn click!");}}
    />
  ));
