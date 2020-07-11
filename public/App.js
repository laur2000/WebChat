import React from "react";
import { render } from "react-dom";
import Message from "./components/message";
import Clock from "./components/clock";
const App = () => {
  return (
    <div>
      <h1>WebChat</h1>
      <Message
        name="Laurentiu"
        message="Hello World!"
        date={new Date().toDateString()}
      />
      <Message
        name="Marta"
        message="Hello Handsome!"
        date={new Date().toDateString()}
      />
      <Clock />
    </div>
  );
};
render(<App />, document.getElementById("root"));
