import { Router } from 'express';
import channels from './routes/channels';
export default () => {
    const app = Router();
    channels(app);
    return app;
}