import React from "react";
import styled from "styled-components";
import { Icon, Input, Button, List, Avatar } from "antd";

const { TextArea } = Input;

const Header = styled.div`
    height: 10%
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #515052 !important;
    padding: 0 50px;
`;

const Title = styled.p`
  text-align: center;
  font-size: 24px;
  color: white;
  margin: 0;
`;

const ChatPanel = styled.div`
  position: relative;
  display: inline-flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 80%;
  width: 100%;
  box-sizing: border-box;
  z-index: 1;
  background: #dcdcdc;
  padding: 10px 10px;
`;

const InputPanel = styled.div`
  position: relative;
  height: 10%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #119da4;
  padding: 0 25px;
`;

const Scrollable = styled.div`
  height: 100%;
  overflow: auto;
  background: white;
  border-radius: 5px;
  padding: 20px 20px;
`;

export default class Chatroom extends React.Component {
  constructor(props) {
    super(props);
    const { chatHistory, socket } = props;

    this.state = {
      socket,
      chatHistory,
      input: ""
    };
  }

  componentDidMount() {
    this.scrollChatToBottom();
  }

  componentDidUpdate() {
    this.scrollChatToBottom();
  }

  onInput = e => {
    this.setState({
      input: e.target.value
    });
  };

  onSendMessage = () => {
    if (!this.state.input) return;
    this.state.socket.sendMessage(this.props.chatroom.gid, this.state.input);
    this.setState({ input: "" });
  };

  scrollChatToBottom() {
    this.panel.scrollTo(0, this.panel.scrollHeight);
  }

  render() {
    return (
      <div style={{ height: "100%" }}>
        <Header>
          <Title>
            {this.props.chatroom.groupname} : {this.props.chatroom.gid}
          </Title>
          <Icon
            type="close-circle"
            style={{ fontSize: 24, color: "white", cursor: "pointer" }}
            onClick={this.props.onLeave}
          />
        </Header>
        <ChatPanel>
          <Scrollable
            innerRef={panel => {
              this.panel = panel;
            }}
          >
            <List
              itemLayout="horizontal"
              dataSource={this.props.chatHistory}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    }
                    title={<a href="https://ant.design">{item.username}</a>}
                    description={
                      item.unread ? (
                        <p style={{ color: "red" }}>{item.message}</p>
                      ) : (
                        <p>{item.message}</p>
                      )
                    }
                  />
                </List.Item>
              )}
            />
          </Scrollable>
        </ChatPanel>
        <InputPanel>
          <TextArea
            autosize={{ minRows: 2, maxRows: 2 }}
            style={{ width: "90%" }}
            onChange={this.onInput}
          />
          <Button
            shape="circle"
            icon="rocket"
            size="large"
            onClick={this.onSendMessage}
          />
        </InputPanel>
      </div>
    );
  }
}
