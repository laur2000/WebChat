import { Socket } from 'socket.io';
import { getToken, verify } from '../../services/jwt';
export default function auth(socket: Socket, next: any) {
    if (!socket.handshake.query) {
        socket.disconnect(true);
        return;
    }
    const token = getToken(socket.handshake.query.token);
    verify(token).then((decode) => {
        next();
        console.log(decode);
    }).catch((error) => {
        socket.disconnect(true);
    });
}