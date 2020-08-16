import { Socket } from "socket.io";
import { getJwtToken, verify, decode } from "../../../services/authProvider";
import ChannelProvider from "../../../services/channelProvider";
import { InvalidateToken } from "../../../services/authProvider";

const connections: { [key: string]: any } = {};

InvalidateToken.on("invalidated", (token) => {
  const connection = connections[token];
  if (connection) {
    connection.disconnect(true);
    delete connections[token];
  }
});

export default function auth(socket: Socket, next: any) {
  if (!socket.handshake.query) {
    socket.disconnect(true);
    return;
  }
  const token = getJwtToken(socket.handshake.query.token);
  if (!token) {
    socket.disconnect(true);
    return;
  }

  const payload = <any>decode(token);
  if (payload && payload.channel) {
    ChannelProvider.getChannelSecret(payload.channel).then((secret) => {
      if (secret) {
        verify(token, secret)
          .then((decode) => {
            socket.handshake.query = decode;
            connections[token] = socket;
            next();
          })
          .catch((error: any) => {
            socket.disconnect(true);
            return;
          });
      } else {
        socket.disconnect(true);
        return;
      }
    });
  }
}
