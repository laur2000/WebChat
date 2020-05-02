import socketio, { Socket } from 'socket.io';
import auth from '../middlewares/authSocket';
export default (server: any) => {
    const chat = socketio(server).of('/chat');
    chat.use(auth);
    chat.on("connection", (socket: Socket) => {
        const payload = socket.handshake.query;
        const channelId = payload.channel;
        const name = payload.name;
        const channel = socket.join(channelId);
        chat.to(channelId).emit('join', "User " + name + " joined the room " + channelId);

        channel.on('message', (msg) => {
            console.log(msg);
            // channel.emit('message', name + ": " + msg);
            chat.to(channelId).emit('message', name + ": " + msg);
        })
    })
}