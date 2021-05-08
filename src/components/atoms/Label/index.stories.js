import { storiesOf } from "@storybook/react";
import React from "react";

import Label from ".";

storiesOf("Label", module)
  .add("default", () => <Label>Hello</Label>)
  .add("reverse", () => <Label reverse>Hello</Label>)
  .add("size", () => <Label size={1.5}>Hello</Label>);
