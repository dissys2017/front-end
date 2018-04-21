import React from "react";
import styled from "styled-components";
import { Form, Icon, Input, Button, Alert } from "antd";
import { connect } from "react-redux";
import { userActions } from "../_actions";
const FormItem = Form.Item;

const Container = styled.div`
  border-radius: 5px;
  width: 30vw;
  // height: auto;
  padding: 40px 40px;
  background: white;
  position: fixed; /* or absolute */
  top: 50%;
  left: 50%;
  margin-top: -20vh;
  margin-left: -15vw;
`;

class NormalLoginForm extends React.Component {
  constructor(props) {
    super(props);

    // reset login status
    this.props.dispatch(userActions.logout());

    this.state = {
      username: "",
      password: "",
      submitted: false
    };
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ submitted: true });
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
    const { username, password } = this.state;
    const { dispatch } = this.props;
    if (username && password) {
      dispatch(userActions.login(username, password));
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { alert, loggingIn } = this.props;
    return (
      <Container>
        {alert.message && (
          <Alert description={alert.message} type={alert.type} showIcon />
        )}
        <Form
          onSubmit={this.handleSubmit}
          className="login-form"
          style={{
            width: "100%"
          }}
        >
          <h1 style={{ fontSize: "3em", textAlign: "center" }}>Log In</h1>
          <FormItem>
            {getFieldDecorator("userName", {
              rules: [
                { required: true, message: "Please input your username!" }
              ]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Username"
                name="username"
                onChange={this.handleChange}
                size="large"
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator("password", {
              rules: [
                { required: true, message: "Please input your Password!" }
              ]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="Password"
                name="password"
                onChange={this.handleChange}
                size="large"
              />
            )}
          </FormItem>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            style={{ width: "100%" }}
            loading={loggingIn}
            size="large"
          >
            Log in
          </Button>
        </Form>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  const { loggingIn } = state.authentication;
  const { alert } = state;
  return {
    loggingIn,
    alert
  };
};

const LoginForm = Form.create()(NormalLoginForm);

export default connect(mapStateToProps)(LoginForm);
