import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Route, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import LoginPage from "../pages/LoginPage";
import theme from "./themes";

const USER_TEST = gql`
  query getUsers {
    users {
      _id
      email
      username
      nickname
      imageUrl
      friends {
        _id
      }
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
        <Route path="/" exact><div>{JSON.stringify(data)}</div></Route>
        <Route path="/login">
          <LoginPage />
        </Route>
      </Switch>
    </ThemeProvider>
  );
}

export default App;
