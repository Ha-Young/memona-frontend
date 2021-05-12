import React from "react";
import { Route, Switch } from "react-router-dom";

import useGeolocation from "../hooks/useGeolocation";
import LoginPage from "../pages/LoginPage";
import MainPage from "../pages/MainPage";
import AuthRoute from "./AuthRoute";

function App() {
  useGeolocation();

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
