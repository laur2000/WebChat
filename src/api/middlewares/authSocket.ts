import { Socket } from 'socket.io';
import { getToken, verify, decode } from '../../services/jwt';
import ChannelProvider from '../../services/channelProvider';
export default function auth(socket: Socket, next: any) {
    if (!socket.handshake.query) {
        socket.disconnect(true);
        return;
    }
    const token = getToken(socket.handshake.query.token);
    const payload = <any>decode(token);
    const channel = payload.channel;
    if (!channel || !ChannelProvider.channelExist(channel)) {
        socket.disconnect(true);
        return;
    }
    verify(token, ChannelProvider.getChannelSecret(channel)).then((decode) => {
        next();
        socket.handshake.query = decode;
        socket.handshake.query.token = token;
    }).catch((error) => {
        socket.disconnect(true);
    });
}