import "react-hot-loader/patch";

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import App from "./components/App";
import theme from "./components/themes";
import GlobalStyle from "./components/themes/GlobalStyle";
import { basename } from "./config";

const client = new ApolloClient({
  uri: process.env.REACT_APP_SERVER_URI,
  cache: new InMemoryCache(),
});

const renderApp = () => (
  <ApolloProvider client={client}>
    <BrowserRouter basename={basename}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </ApolloProvider>
);

const root = document.getElementById("root");
render(renderApp(), root);

if (module.hot) {
  module.hot.accept("./components/App", () => {
    require("./components/App");
    render(renderApp(), root);
  });
}
