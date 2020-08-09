import io, { Server } from "socket.io";
export var socketio: Server;

export function initSocket(server: any) {
  socketio = io(server);
}
