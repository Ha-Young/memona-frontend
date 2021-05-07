import "react-hot-loader/patch";

import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "./components/App";
import GlobalStyle from "./components/themes/GlobalStyle";
import { basename } from "./config";

const renderApp = () => (
  <BrowserRouter basename={basename}>
    <GlobalStyle />
    <App />
  </BrowserRouter>
);

const root = document.getElementById("root");
render(renderApp(), root);

if (module.hot) {
  module.hot.accept("./components/App", () => {
    require("./components/App");
    render(renderApp(), root);
  });
}
