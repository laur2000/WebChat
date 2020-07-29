import { Socket } from "socket.io";
import ChannelProvider from "../../../services/channelProvider";
import User from "../../../models/user";
import { randomBytes } from "crypto";

export default function auth(socket: Socket, next: any) {
  const payload = socket.handshake.query;

  const channelId = payload.channel;
  const channel = ChannelProvider.getChannel(channelId);

  const userId = payload.sub || randomBytes(16).toString("hex");
  const userName = payload.name || randomBytes(6).toString("hex");
  let writePermission = false;
  if (payload.permissions && payload.permissions.indexOf("chat:write") >= 0) {
    writePermission = true;
  }
  const user = new User(userId, userName, writePermission);

  user.addChannel(channel);
  channel.addUser(user);

  socket.handshake.query = { user, channel };

  socket.on("disconnect", () => {
    channel.removeUser(user);
  });
  next();
}
