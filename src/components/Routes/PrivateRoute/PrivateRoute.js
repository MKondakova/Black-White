import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuth } from "../../../helpers/session";
import { AUTH_URL } from "../../../constants/routes";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: AUTH_URL,
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;