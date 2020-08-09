import io from "./socket.io";
class MessageHandler {
  constructor(token) {
    this.token = token;
  }

  url = "https://chat.meantoplay.games/v2/chat";

  connect() {
    console.log("Connecting");
    this.connection = io.connect(this.url, {
      query: {
        token: "Bearer " + this.token,
      },
    });
    this.connection.on("connect", () => {
      console.log("Connected");
    });
  }

  disconnect() {
    if (this.connection) {
      this.connection.disconnect();
      this.connection = null;
    }
  }

  onUserJoin(listener) {
    if (!this.connection) return;
    this.connection.on("join", (message) => {
      listener(this.parseDataWithNoBody(message));
    });
  }

  onUserDisconnect(listener) {
    if (!this.connection) return;
    this.connection.on("disconnected", (message) => {
      listener(this.parseDataWithNoBody(message));
    });
  }

  onUserMessage(listener) {
    if (!this.connection) return;
    this.connection.on("message", (message) => {
      listener(this.parseDataWithBody(message));
    });
  }

  dateToString() {
    let date = new Date();
    return date.getHours() + ":" + ("0" + date.getMinutes()).slice(-2);
  }

  parseDataWithNoBody(data) {
    const res = {
      name: data.userName,
      date: this.dateToString(),
    };

    return res;
  }

  parseDataWithBody(data) {
    const res = {
      name: data.userName,
      body: data.data.message,
      date: this.dateToString(),
    };

    return res;
  }
  send(message) {
    this.connection.emit("message", { message: message });
  }
}

export default MessageHandler;
