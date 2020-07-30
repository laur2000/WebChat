import React from "react";
import InputBar from "./InputBar";
import MessageHandler from "../libraries/MessageHandler";
import Messages from "./Messages";
class Chat extends React.Component {
  state = {
    messages: [],
    channelName: "",
    channelDescription: "",
  };

  componentDidMount() {
    this.messageHandler = new MessageHandler(this.props.token);

    this.onMessageReceived = (message) => {
      const messages = [...this.state.messages, message];
      this.setState({ messages });
    };

    this.onUserJoin = (message) => {
      message.body = `Welcome ${message.name} to ${this.state.channelName}!`;
      message.name = this.state.channelName;
      const messages = [...this.state.messages, message];
      this.setState({ messages });
    };

    this.onUserDisconnect = (user) => {
      user.body = `${user.name} has left the channel ${this.state.channelName}!`;
      const messages = [...this.state.messages, user];
      this.setState({ messages });
    };

    this.onMessageSent = (message) => {
      this.messageHandler.send(message);
    };

    this.messageHandler.connect();
    this.messageHandler.onUserJoin(this.onUserJoin);
    this.messageHandler.onUserMessage(this.onMessageReceived);
    this.messageHandler.onUserDisconnect(this.onUserDisconnect);

    const headers = new Headers();
    headers.append("Authorization", "Bearer " + this.props.token);
    const config = {
      method: "GET",
      headers,
    };
    fetch(
      "https://chat.meantoplay.games/api/v1/channel/" +
        this.props.payload.channel,
      config
    )
      .then((res) => res.json())
      .then((res) => {
        const body = res.success;
        this.setState({
          channelName: body.name,
          channelDescription: body.description,
        });
      })
      .catch(console.error);
  }

  componentWillUnmount() {
    this.messageHandler.disconnect();
    this.messageHandler = null;
  }

  render() {
    const { messages, channelName, channelDescription } = this.state;
    return (
      <React.Fragment>
        <header>
          <h4>{channelName}</h4>
          <p>{channelDescription}</p>
        </header>
        <Messages messages={messages} />
        <div style={{ marginTop: "auto" }}>
          <InputBar onSubmit={this.onMessageSent} />
        </div>
      </React.Fragment>
    );
  }
}

export default Chat;
