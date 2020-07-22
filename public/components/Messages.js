import React from "react";
import Message from "./Message";
class Messages extends React.PureComponent {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  componentDidUpdate() {
    this.myRef.current.scrollTo(0, this.myRef.current.scrollHeight);
  }
  render() {
    const { messages } = this.props;
    return (
      <ul
        className="list-group list-group flush scrollbar scrollbar-black"
        id="messages"
        ref={this.myRef}
      >
        {messages.map((message, index) => (
          <li key={index} className="list-group-item">
            <Message
              name={message.name}
              body={message.body}
              date={message.date}
            />
          </li>
        ))}
      </ul>
    );
  }
}

export default Messages;
