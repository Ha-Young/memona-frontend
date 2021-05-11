import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { storiesOf } from "@storybook/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";

import MainPage from ".";

const client = new ApolloClient({
  uri: process.env.REACT_APP_SERVER_URI,
  cache: new InMemoryCache(),
});

storiesOf("MainPage", module).add("default", () => (
  <BrowserRouter>
    <ApolloProvider client={client}>
      <MainPage />
    </ApolloProvider>
  </BrowserRouter>
));
