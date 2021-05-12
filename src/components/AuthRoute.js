import { Redirect, Route } from "react-router-dom";

import useToken from "../hooks/useToken";

export default function AuthRoute({ children, ...rest }) {
  const { token } = useToken();

  return (
    <Route
      {...rest}
    >
      {token ? children : <Redirect to={{ pathname: "/login", state: { from: rest.path } }} />}
    </Route>
  );
};
