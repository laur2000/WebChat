import { Request, Response, NextFunction } from 'express';
import { getToken, verify } from '../../services/jwt';

export default function auth(req: Request, res: Response, next: NextFunction) {
    const token = getToken(req.headers.authorization);
    verify(token)
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