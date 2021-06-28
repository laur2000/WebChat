import React from "react";

import {RecordAudio} from "./RecordAudio";
class InputBar extends React.Component {
  state = {
    text: "",
  };

  handleChatSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state.text);
    this.setState({
      text: "",
    });
  };

  handleChatChange = (event) => {
    this.setState({ text: event.target.value });
  };

  checkTextSubmit = (event) => {
    if (event.which == 13 && !event.shiftKey) {
      this.handleChatSubmit(event);
    }
  };

  render() {
    const { text } = this.state;
    return (
      <div className="d-flex">
        <form
          id="chat-form"
          onSubmit={this.handleChatSubmit}
          className="d-flex w-100"
        >
          <textarea
            id="chat-input"
            className="form-control"
            type="text"
            required
            autoComplete="off"
            name="chat-text"
            value={text}
            onChange={this.handleChatChange}
            onBlur={this.handleChatChange}
            onKeyPress={this.checkTextSubmit}
          ></textarea>

          <button type="submit" className="btn ml-1">
            <i className="fas fa-paper-plane"></i>
          </button>
        </form>
        <RecordAudio />
        <button className="btn ml-1">
          <i className="far fa-smile-beam"></i>
        </button>
      </div>
    );
  }
}

export default InputBar;
