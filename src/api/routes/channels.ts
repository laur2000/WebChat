import { Router, Request, Response, NextFunction } from 'express';
import auth from '../middlewares/authRequest';
import ChannelProvider from '../../services/channelProvider';
const route = Router();

export default (app: Router) => {
    app.use('/channel', route);

    route.get('/:channelId', auth("ch:read"), (req: Request, res: Response, next: NextFunction) => {
        const channelId = req.params.channelId;
        if (ChannelProvider.channelExist(channelId)) {
            const channel = ChannelProvider.getChannel(channelId);
            const users = [];
            const usersDict = channel.getUsers();
            for (let userId in usersDict) {
                const user = usersDict[userId];
                users.push({
                    id: user.getId(),
                    name: user.getName()
                });
            }
            res.send({
                error: null,
                success: {
                    name: channel.getName(),
                    users
                }
            });
            res.end();
        }
        else {
            res.status(404);
            res.send({
                error: "Channel not found",
                success: null
            });
            res.end();
        }

    });

    route.post('/', (req: Request, res: Response, next: NextFunction) => {
        const payload = req.body;
        if (!payload || !payload.secret) {
            res.status(400);
            res.send({
                error: "Payload secret was not providen",
                success: null
            });
            res.end();
        } else {
            const channel = ChannelProvider.addChannel(payload.secret)
            res.send({
                error: null,
                success: channel.getId()
            });
            res.end();
        }

    });

    route.patch('/:channelId', auth("ch:read", "ch:edit"), (req: Request, res: Response, next: NextFunction) => {
        const payload = req.body;
        if (!payload || !(payload.secret || payload.name)) {
            res.status(400)
            res.send({
                error: "Payload is empty",
                success: null
            });
            res.end();
        }
        else {
            res.send({
                error: null,
                success: "Channel modified successfully"
            });
            res.end();
        }
    })

}