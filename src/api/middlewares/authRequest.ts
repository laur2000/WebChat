import { Request, Response, NextFunction } from 'express';
import { getToken, verify, decode } from '../../services/jwt';
import ChannelProvider from '../../services/channelProvider';

export default function auth(req: Request, res: Response, next: NextFunction) {
    const token = getToken(req.headers.authorization);
    try {
        const payload = <any>decode(token);
        verify(token, ChannelProvider.getChannelSecret(payload.channel))
            .then(decoded => {
                res.locals.payload = decoded;
                next();
            })
            .catch(error => {
                res.status(401);
                res.send({
                    error: error,
                    success: null
                });
                res.end();
            })
    }
    catch {
        res.status(400);
        res.send({
            error: "Payload is not provided",
            success: null
        });
        res.end();
    }

}