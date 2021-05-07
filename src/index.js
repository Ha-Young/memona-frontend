import "react-hot-loader/patch";

import App from "components/App";
import { basename } from "config";
import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";

const renderApp = () => (
  <BrowserRouter basename={basename}>
    <App />
  </BrowserRouter>
);

const root = document.getElementById("app");
render(renderApp(), root);

if (module.hot) {
  module.hot.accept("components/App", () => {
    require("components/App");
    render(renderApp(), root);
  });
}
