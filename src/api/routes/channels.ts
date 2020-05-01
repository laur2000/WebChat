import { Router, Request, Response, NextFunction } from 'express';
import auth from '../middlewares/authRequest';
const route = Router();
var channel_id = 0;
export default (app: Router) => {
    app.use('/channel', route);

    route.get('/', auth, (req: Request, res: Response, next: NextFunction) => {
        res.send('Channel correct');
        res.end();
    })

}

function nextChannelId() {
    return channel_id++;
}