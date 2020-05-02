import { Socket } from 'socket.io';
import { getToken, verify, decode } from '../../services/jwt';
import { secrets } from '../routes/channels';
export default function auth(socket: Socket, next: any) {
    if (!socket.handshake.query) {
        socket.disconnect(true);
        return;
    }
    const token = getToken(socket.handshake.query.token);
    const payload = <any>decode(token);
    const channel = payload.channel;
    if (!channel || !secrets[channel]) {
        socket.disconnect(true);
        return;
    }
    verify(token, secrets[channel]).then((decode) => {
        next();
        socket.handshake.query = decode;
    }).catch((error) => {
        socket.disconnect(true);
    });
}