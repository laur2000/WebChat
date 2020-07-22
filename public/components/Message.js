import React from "react";
export default class Message extends React.PureComponent {
  render() {
    const { name, body, date } = this.props;
    return (
      <div>
        <b>{name}</b>
        <p>{body}</p>
        <time>{date}</time>
      </div>
    );
  }
}
