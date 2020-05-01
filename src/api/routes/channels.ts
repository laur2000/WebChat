import { Router, Request, Response, NextFunction } from 'express';
import auth from '../middlewares/auth';
const route = Router();

export default (app: Router) => {
    app.use('/channel', route);

    route.get('/', auth, (req: Request, res: Response, next: NextFunction) => {
        res.send('Channel correct');
        res.end();
    })
}