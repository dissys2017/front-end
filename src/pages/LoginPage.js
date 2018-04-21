import React from "react";
import { Layout } from "antd";
import { LoginForm } from "../components";

const { Content } = Layout;

const LoginPage = () => (
  <Layout className="layout" style={{ height: "100vh" }}>
    <Content style={{ background: "#041428" }}>
      <LoginForm />
    </Content>
  </Layout>
);

export default LoginPage;
