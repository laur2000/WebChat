import socketio, { Socket } from "socket.io";
import auth from "../middlewares/authSocket";
import ChannelProvider from "../../services/channelProvider";
import User from "../../models/user";
import { InvalidateToken } from "../../services/jwt";
import { JsonWebTokenError } from "jsonwebtoken";
export default (server: any) => {
  const chat = socketio(server).of("/chat");
  chat.use(auth);
  chat.on("connection", (socket: Socket) => {
    const payload = socket.handshake.query;

    const channelId = payload.channel;
    const channel = ChannelProvider.getChannel(channelId);
    const user = new User(payload.sub, payload.name);
    user.addChannel(channel);
    channel.addUser(user);
    const onDisconnect = () => {
      user.removeChannel(channel);
      channel.removeUser(user);
    };
    function invalidate(token: string) {
      if (token == payload.token) {
        console.log("Invalidating " + user.getId());
        chat.to(channelId).emit("invalidated", user.getId());
        onDisconnect();
        InvalidateToken.off("invalidated", invalidate);
        socket.disconnect(true);
      }
    }

    InvalidateToken.on("invalidated", invalidate);
    const room = socket.join(channelId);
    chat.to(channelId).emit("join", {
      userId: user.getId(),
      userName: user.getName(),
    });

    room.on("message", (msg) => {
      let userData = {
        userId: user.getId(),
        userName: user.getName(),
        data: msg,
      };

      chat.to(channelId).emit("message", userData);
    });

    room.on("disconnect", () => {
      onDisconnect();
      chat.to(channelId).emit("disconnected", {
        userId: user.getId(),
        userName: user.getName(),
      });
      InvalidateToken.off("invalidated", invalidate);
    });
  });
};
