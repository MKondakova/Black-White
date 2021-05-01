import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuth } from "../../../helpers/session";
import { MAIN_URL } from "../../../constants/routes";

const LoginRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuth() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: MAIN_URL,
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default LoginRoute;
