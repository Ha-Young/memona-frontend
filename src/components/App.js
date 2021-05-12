import React from "react";
import { Route, Switch } from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import MainPage from "../pages/MainPage";
import AuthRoute from "./AuthRoute";

function App() {
  return (
    <Switch>
      <AuthRoute path="/" exact>
        <MainPage />
      </AuthRoute>
      <Route path="/login">
        <LoginPage />
      </Route>
    </Switch>
  );
}

export default App;
