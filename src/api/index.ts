import { Router } from 'express';
import channels from './routes/channels';
import chat from './routes/chat';

export default (server: any) => {
    const app = Router();

    channels(app);
    chat(server);
    return app;
}