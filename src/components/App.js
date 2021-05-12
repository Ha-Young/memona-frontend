import React from "react";
import { Route, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import LoginPage from "../pages/LoginPage";
import MainPage from "../pages/MainPage";
import AuthRoute from "./AuthRoute";
import theme from "./themes";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Switch>
        <AuthRoute path="/" exact>
          <MainPage />
        </AuthRoute>
        <Route path="/login">
          <LoginPage />
        </Route>
      </Switch>
    </ThemeProvider>
  );
}

export default App;
