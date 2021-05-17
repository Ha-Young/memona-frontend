import { storiesOf } from "@storybook/react";
import React from "react";

import AddPostModalView from ".";

storiesOf("AddPostModalView", module)
  .add("default", () => (
    <AddPostModalView
      onAddToHomeBtnClick={() => {console.log("add to home btn click!");}}
    />
  ));
