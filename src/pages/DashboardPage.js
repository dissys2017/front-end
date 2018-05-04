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
    if (nextProps.chatHistory) {
      this.setState({ chatHistory: nextProps.chatHistory });
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
    let oldKey = this.state.selectedKeys;

    const head = "/dashboard";
    let path = `${head}/${e.item.props.gid}`;
    history.push(path);
    this.setState({ selectedKeys: [e.key] });
    this.state.socket.getPrevMessage(e.item.props.gid);
    this.state.socket.breakGroup(oldKey);

    if (oldKey !== undefined && oldKey !== [""]) {
      const { chatHistory, chatrooms } = this.state;
      oldKey = oldKey[0];
      chatHistory[chatrooms[parseInt(oldKey)].gid] &&
        chatHistory[chatrooms[parseInt(oldKey)].gid].forEach(chat => {
          chat.unread = false;
        });
      this.setState({ chatHistory });
    }
  };

  onInputChange = e => {
    this.setState({ input: e.target.value });
  };

  renderChatroomOrRedirect = chatroom => {
    // const { chatHistory } = history.location.state;

    return (
      <Chatroom
        chatroom={chatroom}
        chatHistory={this.state.chatHistory[chatroom.gid]}
        user={this.state.user}
        socket={this.state.socket}
        onLeave={() => {
          this.setState({ selectedKeys: [""] });
          history.push("/dashboard");
        }}
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
              style={{ width: "40%" }}
              onChange={this.onInputChange}
            />
            <Button
              size="large"
              onClick={() => {
                this.state.socket.createGroup(this.state.input);
                this.setState({ input: "" });
              }}
            >
              Add Group
            </Button>
            <Button
              size="large"
              onClick={() => {
                this.state.socket.joinGroup(this.state.input);
                this.setState({ input: "" });
              }}
            >
              Join Group
            </Button>
            <Button
              size="large"
              onClick={() => {
                this.state.socket.leaveGroup(this.state.input);
                this.setState({ input: "" });
              }}
            >
              Leave Group
            </Button>
          </div>
          <Button type="primary" size="large" onClick={this.handleSignOut}>
            Sign Out
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
              {this.state.chatrooms &&
                this.state.chatrooms.map((room, key) => (
                  <Menu.Item key={key} gid={room.gid}>
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
                {this.state.chatrooms.map((chatroom, key) => (
                  <Route
                    key={key}
                    exact
                    path={`/dashboard/${chatroom.gid}`}
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
