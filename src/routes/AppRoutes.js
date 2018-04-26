import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { LoginPage } from "../pages";

class AppRoutes extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={LoginPage} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default AppRoutes;
