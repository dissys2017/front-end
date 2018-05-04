import React from "react";
import { Layout } from "antd";
import styled from "styled-components";
import { LoginForm } from "../components";

const { Content } = Layout;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
  margin: 60px 0px;
`;

const H1 = styled.h1`
  color: white;
  font-size: 2.5rem;
  font-weight: lighter;
`;

const Strong = styled(H1)`
  font-style: italic;
  font-weight: bold;
`;

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    const { socket } = this.props;
    this.state = { socket, username: "", password: "" };
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    this.props.onChange(e);
  };

  login = () => {
    console.log("sign in");
    this.state.socket.login(this.state.username, this.state.password);
  };

  register = () => {
    console.log("sign up");
    this.state.socket.register(this.state.username, this.state.password);
  };

  render() {
    return (
      <Layout className="layout" style={{ height: "100vh" }}>
        <Content style={{ background: "#041428" }}>
          <TitleContainer>
            <H1>Welcome to</H1>
            <Strong>" Becareful !!! can't edit anything "</Strong>
            <H1>Chat application</H1>
          </TitleContainer>
          <LoginForm
            onChange={this.handleChange}
            onSignInClick={this.login}
            onSignUpClick={this.register}
          />
        </Content>
      </Layout>
    );
  }
}

export default LoginPage;
