import "react-hot-loader/patch";

import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import App from "./components/App";
import theme from "./components/themes";
import GlobalStyle from "./components/themes/GlobalStyle";
import { authPrefix, basename, gqlAPIUrl, tokenKey } from "./config";
import { getStorage } from "./utils/localStorage";

const httpLink = createHttpLink({
  uri: gqlAPIUrl,
});

const authLink = setContext((_, { headers }) => {
  const token = getStorage(tokenKey);

  return {
    headers: {
      ...headers,
      authorization: token ? `${authPrefix} ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
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
