import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Auth from "src/Routes/Auth";
import Home from "src/Routes/Home";

interface IProps {
  isLoggedIn: boolean;
}

const AppRouter: React.SFC<IProps> = (props) => (
  <BrowserRouter>
    {props.isLoggedIn ? (
      <Switch>
        <Route path={"/"} exact={true} component={Home} />
      </Switch>
    ) : (
      <Switch>
        <Route path={"/"} exact={true} component={Auth} />
      </Switch>
    )}
  </BrowserRouter>
);

export default AppRouter;
