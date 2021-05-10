import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { storiesOf } from "@storybook/react";
import React from "react";

import LoginPage from ".";

const client = new ApolloClient({
  uri: process.env.REACT_APP_SERVER_URI,
  cache: new InMemoryCache(),
});

storiesOf("LoginPage", module).add("default", () => (
  <ApolloProvider client={client}>
    <LoginPage />
  </ApolloProvider>
));
