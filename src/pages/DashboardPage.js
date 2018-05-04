import React from "react";
import { Layout, Menu, Icon, Button } from "antd";
import { history } from "../routes";

const { Header, Content, Sider } = Layout;

class DashboardPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { chatroomList: ["Room1", "Room2"] };
  }
  randomIcon = () => {
    const iconList = [
      "mail",
      "appstore",
      "pie-chart",
      "desktop",
      "inbox",
      "calendar"
    ];
    return iconList[Math.floor(Math.random() * Math.floor(iconList.length))];
  };

  handleSignOut = () => {
    history.push("/");
  };
  render() {
    const { user } = this.props;
    return (
      <Layout style={{ height: "100vh" }}>
        <Header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <h1 style={{ color: "white", margin: "0px" }}>Username: {user}</h1>
          <Button type="primary" size="large" onClick={this.handleSignOut}>
            Logout
          </Button>
        </Header>
        <Layout>
          <Sider width={250} style={{ background: "#fff" }}>
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              style={{ height: "100%", borderRight: 0 }}
            >
              {this.state.chatroomList.map((room, key) => (
                <Menu.Item key={key}>
                  <Icon type={this.randomIcon()} />
                  {room}
                </Menu.Item>
              ))}
            </Menu>
          </Sider>
          <Layout style={{ padding: "24px 24px 24px" }}>
            <Content
              style={{
                background: "#fff",
                padding: 24,
                margin: 0,
                minHeight: 280
              }}
            >
              Content
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

export default DashboardPage;
