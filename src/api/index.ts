import { Router } from 'express';
import channels from './routes/channels';
import chat from './routes/chat';
import signToken from './routes/signToken';
import bodyParser from 'body-parser';

export default (server: any) => {
    const app = Router();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    channels(app);
    signToken(app);
    chat(server);

    return app;
}