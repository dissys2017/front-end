import React from "react";
import { Switch, Route, Router } from "react-router-dom";
import { message } from "antd";
import { LoginPage, DashboardPage } from "../pages";
import { history } from "./history";
import chatSocket from "../socket";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: "LAAMSANG", chatHistory: {} };
  }

  componentWillMount() {
    const socket = new chatSocket({
      onRegisterSuccess: this.onRegisterSuccess,
      onRegisterError: this.onRegisterError,
      onLoginSuccess: this.onLoginSuccess,
      onLoginError: this.onLoginError,
      onAlreadyLogIn: this.onAlreadyLogIn,
      onReceiveGroups: this.onReceiveGroups,
      onReceivePreviousGroupMessage: this.onReceivePreviousGroupMessage,
      onReceiveMessage: this.onReceiveMessage
    });
    this.setState({
      socket: socket
    });
  }

  onReceiveGroups = data => {
    console.log("receive");
  };

  onRegisterSuccess = () => {
    message.success("Sign Up Success!!!");
  };

  onRegisterError = () => {
    message.error("Sign Up Fail!!!");
  };

  onLoginSuccess = () => {
    history.push("/dashboard");
  };

  onLoginError = () => {
    message.error("Sign In Fail!!!");
  };

  onAlreadyLogIn = () => {
    message.error("This account is already logged In!!!");
  };

  onReceiveGroups = data => {
    console.log("receive");
    if (data) {
      this.setState({ chatrooms: data.groups });
    }
  };

  onReceiveMessage = data => {
    console.log(data);
    const { chatHistory } = this.state;
    console.log(chatHistory);
    if (chatHistory[data.gid]) {
      chatHistory[data.gid] = [...chatHistory[data.gid], data];
    } else {
      chatHistory[data.gid] = [data];
    }
    console.log(chatHistory);
    this.setState({ chatHistory: chatHistory });
  };

  onReceivePreviousGroupMessage = data => {
    const { chatHistory } = this.state;
    if (data.type === "all") {
      chatHistory[data.gid] = data.newMessages;
    } else if (data.type === "incremental") {
      chatHistory[data.gid] = [...chatHistory[data.gid], ...data.newMessages];
    }
    this.setState({ chatHistory: chatHistory });
  };

  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route
            exact
            path="/"
            render={props => <LoginPage socket={this.state.socket} />}
          />
          <Route
            path="/dashboard"
            render={props => (
              <DashboardPage
                user={this.state.user}
                socket={this.state.socket}
                chatrooms={this.state.chatrooms}
                chatHistory={this.state.chatHistory}
              />
            )}
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
