import { Router, Request, Response, NextFunction } from 'express';
import { sign, decode, getExpRemaining } from '../../services/jwt';
const route = Router();
export default function (app: Router) {
    app.use('/sign', route);

    route.post('/', (req: Request, res: Response, next: NextFunction) => {
        const secret = req.body.secret;
        const payload = req.body.payload;
        const options = req.body.options || {};
        console.log(payload);
        if (!payload || !secret) {
            res.status(400);
            res.send({
                error: "Secret was not providen",
                success: null
            });
            res.end();
        }
        else {
            if (!options.expiresIn) {
                options.expiresIn = '1h'
            }
            sign(payload, secret, options)
                .then(token => {
                    const body = <any>decode(token);
                    if (body) {
                        res.send({
                            error: null,
                            success: {
                                token: token,
                                expiresIn: getExpRemaining(body.exp)
                            }
                        });
                    }
                    res.end();

                })
                .catch(error => {
                    res.status(400);
                    res.send({
                        error: error,
                        success: null
                    })
                    res.end();
                });
        }

    })
}