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

const LoginPage = () => (
  <Layout className="layout" style={{ height: "100vh" }}>
    <Content style={{ background: "#041428" }}>
      <TitleContainer>
        <H1>Welcome to</H1>
        <Strong>" Becareful !!! can't edit anything "</Strong>
        <H1>Chat application</H1>
      </TitleContainer>
      <LoginForm />
    </Content>
  </Layout>
);

export default LoginPage;
