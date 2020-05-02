import { Router, Request, Response, NextFunction } from 'express';
import auth from '../middlewares/authRequest';
const route = Router();
var channel_id = 0;
export const secrets: { [ch: string]: string } = {};
export default (app: Router) => {
    app.use('/channel', route);

    route.post('/', (req: Request, res: Response, next: NextFunction) => {
        const payload = req.body;
        if (!payload && !payload.secret) {
            res.status(400);
            res.send({
                error: "Payload secret was not providen",
                success: null
            });
            res.end();
        } else {
            const channel = 'ch' + nextChannelId();
            secrets[channel] = payload.secret;

            res.send({
                error: null,
                success: {
                    channel: channel
                }
            });
            res.end();
        }

    })

}

function nextChannelId() {
    return channel_id++;
}