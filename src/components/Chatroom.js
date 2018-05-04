import React from "react";
import styled from "styled-components";

const Header = styled.div`
    height: 20%
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export default class Chatroom extends React.Component {
  constructor(props) {
    super(props);
    const { chatHistory } = props;

    this.state = {
      chatHistory,
      input: ""
    };
  }

  componentDidMount() {
    this.props.registerHandler(this.onMessageReceived);
    this.scrollChatToBottom();
  }

  componentDidUpdate() {
    this.scrollChatToBottom();
  }

  componentWillUnmount() {
    this.props.unregisterHandler();
  }

  onInput(e) {
    this.setState({
      input: e.target.value
    });
  }

  onSendMessage() {
    if (!this.state.input) return;

    this.props.onSendMessage(this.state.input, err => {
      if (err) return console.error(err);

      return this.setState({ input: "" });
    });
  }

  onMessageReceived(entry) {
    console.log("onMessageReceived:", entry);
    this.updateChatHistory(entry);
  }

  updateChatHistory(entry) {
    this.setState({ chatHistory: this.state.chatHistory.concat(entry) });
  }

  scrollChatToBottom() {
    this.panel.scrollTo(0, this.panel.scrollHeight);
  }

  render() {
    return (
      <div style={{ height: "100%" }}>
        {/* <Header>
          <Title>{this.props.chatroom.name}</Title>
          <RaisedButton
            primary
            icon={
              <FontIcon style={{ fontSize: 24 }} className="material-icons">
                {"close"}
              </FontIcon>
            }
            onClick={this.props.onLeave}
          />
        </Header> */}
      </div>
    );
  }
}
