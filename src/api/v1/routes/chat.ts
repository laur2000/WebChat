import socketio, { Socket } from "socket.io";
import auth from "../middlewares/authSocket";
import addUser from "../middlewares/addUserSocket";

export default (server: any) => {
  const chat = socketio(server).of("/chat");
  chat.use(auth);
  chat.use(addUser);
  chat.on("connection", (socket: Socket) => {
    const { user, channel } = socket.handshake.query;
    const channelId = channel.getId();

    const room = socket.join(channelId);
    chat.to(channelId).emit("join", {
      userId: user.getId(),
      userName: user.getName(),
    });

    room.on("message", (msg) => {
      if (!user.getWritePermission()) {
        return;
      }
      let userData = {
        userId: user.getId(),
        userName: user.getName(),
        data: msg,
      };

      chat.to(channelId).emit("message", userData);
    });

    room.on("disconnect", () => {
      chat.to(channelId).emit("disconnected", {
        userId: user.getId(),
        userName: user.getName(),
      });
    });
  });
};
