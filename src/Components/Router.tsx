import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Auth from "src/Routes/Auth";
import Exercises from "src/Routes/Exercises";
import Home from "src/Routes/Home";
import Inbodies from "src/Routes/Inbodies";
import Workouts from "src/Routes/Workouts";
import styled from "styled-components";
import NavigationBar from "./NavigationBar";

interface IProps {
  isLoggedIn: boolean;
}

const Container = styled.div`
  margin-left: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const AppRouter: React.SFC<IProps> = (props) => (
  <BrowserRouter>
    {props.isLoggedIn ? (
      <>
        <NavigationBar />
        <Container>
          <Switch>
            <Route path={"/"} exact={true} component={Home} />
            <Route path={"/exercises"} exact={true} component={Exercises} />
            <Route path={"/workouts"} exact={true} component={Workouts} />
            <Route path={"/inbodies"} exact={true} component={Inbodies} />
          </Switch>
        </Container>
      </>
    ) : (
      <Switch>
        <Route path={"/"} exact={true} component={Auth} />
      </Switch>
    )}
  </BrowserRouter>
);

export default AppRouter;
