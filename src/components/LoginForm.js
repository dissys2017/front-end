import React from "react";
import styled from "styled-components";
import { Form, Icon, Input, Button, Alert } from "antd";

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
  margin-top: -10vh;
  margin-left: -15vw;
`;

const ButtonWithMargin = styled(Button)`
  margin-bottom: 24px;
`;

class NormalLoginForm extends React.Component {
  constructor(props) {
    super(props);
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
  };

  render() {
    const { getFieldDecorator } = this.props.form;
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
          <h1 style={{ fontSize: "3em", textAlign: "center" }}>Sign In</h1>
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
          <ButtonWithMargin
            type="primary"
            htmlType="submit"
            className="login-form-button"
            style={{ width: "100%" }}
            size="large"
          >
            Sign in
          </ButtonWithMargin>
          <ButtonWithMargin
            type="danger"
            htmlType="submit"
            className="login-form-button"
            style={{ width: "100%" }}
            size="large"
          >
            Sign Up
          </ButtonWithMargin>
        </Form>
      </Container>
    );
  }
}

const LoginForm = Form.create()(NormalLoginForm);

export default LoginForm;
