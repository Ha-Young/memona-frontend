import { storiesOf } from "@storybook/react";
import React from "react";

import LoginForm from ".";

storiesOf("LoginForm", module)
  .add("default", () => (
    <LoginForm
      title="Memona"
      information="당신의 추억의 위치를 기억하세요"
    />
  ));
