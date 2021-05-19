import "react-hot-loader/patch";

import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { createUploadLink } from "apollo-upload-client";
import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import App from "./components/App";
import theme from "./components/themes";
import GlobalStyle from "./components/themes/GlobalStyle";
import { authPrefix, basename, gqlAPIUrl, tokenKey } from "./config";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { getStorage } from "./utils/localStorage";
import uniqBy from "./utils/uniqBy";

const uploadLink = createUploadLink({
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
  link: ApolloLink.from([authLink, uploadLink]),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          posts: {
            keyArgs: false,
            merge(existing = null, incoming) {
              if (existing === null) {
                return incoming;
              }

              const uniqDocs = uniqBy(incoming.docs, "__ref");

              return {
                ...incoming,
                docs: uniqDocs,
              };
            },
          },
        },
      },
    },
  }),
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

serviceWorkerRegistration.register();
