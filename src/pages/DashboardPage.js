import React from "react";
import { Layout, Menu, Icon, Button, Input } from "antd";
import { Switch, Route } from "react-router-dom";
import { history } from "../routes";
import { Chatroom } from "../components";

const { Header, Content, Sider } = Layout;

class DashboardPage extends React.Component {
  constructor(props) {
    super(props);
    const { user } = this.props;
    this.state = {
      user,
      chatrooms: [{ name: "room1" }, { name: "room2" }],
      addVisible: false,
      joinVisible: false
    };
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

  handleSelected = e => {
    const head = "/dashboard";
    let path = `${head}/${
      this.state.chatrooms[parseInt(e.key, this.state.chatrooms.length)].name
    }`;
    history.push(path);
    this.setState({ selectedKeys: [e.key] });
  };

  onLeaveChatroom(chatroomName, onLeaveSuccess) {
    // this.state.client.leave(chatroomName, err => {
    //   if (err) return console.error(err);
    return onLeaveSuccess();
    // });
  }

  renderChatroomOrRedirect = chatroom => {
    // const { chatHistory } = history.location.state;

    return (
      <Chatroom
        chatroom={chatroom}
        // chatHistory={chatHistory}
        user={this.state.user}
        onLeave={() =>
          this.onLeaveChatroom(chatroom.name, () => {
            this.setState({ selectedKeys: [""] });
            history.push("/dashboard");
          })
        }
        onSendMessage={(message, cb) =>
          this.state.client.message(chatroom.name, message, cb)
        }
      />
    );
  };

  render() {
    return (
      <Layout style={{ height: "100vh" }}>
        <Header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <h1 style={{ color: "white", margin: "0px" }}>
            Username: {this.state.user}
          </h1>
          <div
            style={{
              width: "60%",
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center"
            }}
          >
            <Input
              placeholder="Input group to add or group id to join"
              style={{ width: "50%" }}
            />
            <Button size="large" onClick={{}}>
              Add Group
            </Button>
            <Button size="large" onClick={{}}>
              Join Group
            </Button>
          </div>
          <Button type="primary" size="large" onClick={this.handleSignOut}>
            Logout
          </Button>
        </Header>
        <Layout>
          <Sider width={250} style={{ background: "#fff" }}>
            <Menu
              mode="inline"
              style={{ height: "100%", borderRight: 0 }}
              selectedKeys={this.state.selectedKeys}
              onSelect={this.handleSelected}
            >
              {this.state.chatrooms.map((room, key) => (
                <Menu.Item key={key}>
                  <Icon type={this.randomIcon()} />
                  {room.name}
                </Menu.Item>
              ))}
            </Menu>
          </Sider>
          <Layout style={{ padding: "24px 24px 24px" }}>
            <Content
              style={{
                background: "#fff",
                // padding: 24,
                margin: 0,
                minHeight: 280,
                height: "100%"
              }}
            >
              <Switch>
                {this.state.chatrooms.map(chatroom => (
                  <Route
                    key={chatroom.name}
                    exact
                    path={`/dashboard/${chatroom.name}`}
                    render={props =>
                      this.renderChatroomOrRedirect(chatroom, props)
                    }
                  />
                ))}
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

export default DashboardPage;
