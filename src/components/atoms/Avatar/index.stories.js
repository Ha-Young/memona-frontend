import { storiesOf } from "@storybook/react";
import React from "react";

import Avatar from ".";

const defaultImage = "https://lh3.googleusercontent.com/a/AATXAJwtCFYAlDYjooMIEVhBD8VZsJ35X164RKn034hc=s96-c";

storiesOf("Avatar", module)
  .add("default", () => (
    <Avatar
      alt="test1"
      src={defaultImage}
    />
  ))
  .add("size", () => (
    <Avatar
      alt="test2"
      src={defaultImage}
      size={100}
    />
  ));
