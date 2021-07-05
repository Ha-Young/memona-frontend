import { boolean, select, text, withKnobs } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";

import GoogleLogin from ".";

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const options = {
  None: null,
  Blue: "dark",
};

// GOOGLE LOGIN BUTTON MODULE
const story = storiesOf("Google Login Button", module);

// KNOBS
story.addDecorator(withKnobs);

// MAIN BUTTON W/ ACTION LOGGER
story.add(
  "Default Button",
  () => (
    <GoogleLogin
      theme={select("Theme", options)}
      clientId={clientId}
      disabled={boolean("Disabled", false)}
      onAutoLoadFinished={console.log("autoLoadFinished")}
      onSuccess={console.log("clicked")}
      onFailure={console.log("clicked")}
    >
      {text("Button Text", "")}
    </GoogleLogin>
  )
);
