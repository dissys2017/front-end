import React from "react";
import { Switch, Route, Router } from "react-router-dom";
import { LoginPage, DashboardPage } from "../pages";
import { history } from "./history";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: "LAAMSANG" };
  }
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route
            exact
            path="/dashboard"
            render={props => <DashboardPage user={this.state.user} />}
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
