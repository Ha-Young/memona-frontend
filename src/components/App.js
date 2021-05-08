import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Route, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import theme from "./themes";

const USER_TEST = gql`
  query getUsers {
    userfs {
      _id
      email
      username
      nickname
      avatar
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(USER_TEST);

  console.log("loading", loading);
  console.log("error", error);
  console.log("data", data);

  return (
    <ThemeProvider theme={theme}>
      <Switch>
        <Route path="/"><div>{JSON.stringify(data)}</div></Route>
      </Switch>
    </ThemeProvider>
  );
}

export default App;
