import React from "react";
import { Switch, Route, Router } from "react-router-dom";
import { connect } from "react-redux";
import { LoginPage } from "../pages";
import { history } from "../_helpers";
// import PrivateRoute from "./PrivateRoute";
import { alertActions } from "../_actions";

class AppRoutes extends React.Component {
  constructor(props) {
    super(props);

    // this line is required to work on plunker because the app preview runs on a subfolder url
    history.push("/");

    const { dispatch } = this.props;
    history.listen((location, action) => {
      // clear alert on location change
      dispatch(alertActions.clear());
    });
  }
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={LoginPage} />
        </Switch>
      </Router>
    );
  }
}

export default connect()(AppRoutes);
