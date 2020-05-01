import socketio, { Socket } from 'socket.io';
import auth from '../middlewares/authSocket';
export default (server: any) => {
    const chat = socketio(server).of('/chat');
    chat.use(auth);
    chat.on("connection", (socket: Socket) => {
        console.log("Connected");
    })
}