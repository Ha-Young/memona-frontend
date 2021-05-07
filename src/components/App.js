import React from "react";
import { Route,Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import theme from "./themes";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Switch>
        <Route path="/">
          Memona
        </Route>
      </Switch>
    </ThemeProvider>
  );
}

export default App;
