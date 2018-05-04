import React from "react";
import { Layout, Menu, Icon, Button, Input } from "antd";
import { Switch, Route } from "react-router-dom";
import { history } from "../routes";
import { Chatroom } from "../components";

const { Header, Content, Sider } = Layout;

class DashboardPage extends React.Component {
  constructor(props) {
    super(props);
    const { user, socket, chatrooms } = this.props;
    this.state = {
      socket,
      user,
      chatrooms: chatrooms || [{ groupname: "room1" }, { groupname: "room2" }],
      input: ""
    };
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.chatrooms) {
      this.setState({ chatrooms: nextProps.chatrooms });
    }
  };

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
      this.state.chatrooms[parseInt(e.key, this.state.chatrooms.length)]
        .groupname
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

  onInputChange = e => {
    this.setState({ input: e.target.value });
  };

  renderChatroomOrRedirect = chatroom => {
    // const { chatHistory } = history.location.state;

    return (
      <Chatroom
        chatroom={chatroom}
        // chatHistory={chatHistory}
        user={this.state.user}
        onLeave={() =>
          this.onLeaveChatroom(chatroom.groupname, () => {
            this.setState({ selectedKeys: [""] });
            history.push("/dashboard");
          })
        }
        onSendMessage={(message, cb) =>
          this.state.client.message(chatroom.groupname, message, cb)
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
              onChange={this.onInputChange}
            />
            <Button
              size="large"
              onClick={() => {
                this.state.socket.createGroup(this.state.input);
              }}
            >
              Add Group
            </Button>
            <Button
              size="large"
              onClick={() => {
                this.state.socket.joinGroup(this.state.input);
              }}
            >
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
                  {room.groupname}
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
                    key={chatroom.groupname}
                    exact
                    path={`/dashboard/${chatroom.groupname}`}
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
