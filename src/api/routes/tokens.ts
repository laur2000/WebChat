import { Router, Request, Response, NextFunction } from 'express';
import { sign, decode, getExpRemaining, invalidate } from '../../services/jwt';
const route = Router();
export default function (app: Router) {
    app.use('/token', route);


    route.get('/:token', (req: Request, res: Response, next: NextFunction) => {
        const token = req.params.token;
        try {
            const payload = <any>decode(token);
            res.send({
                error: null,
                success: {
                    payload: payload
                }
            })
        }
        catch (error) {
            res.send({
                error: error,
                success: null
            });
        }
        res.end();
    })

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

    });

    route.delete('/', (req: Request, res: Response, next: NextFunction) => {
        const token = req.body.token;
        invalidate(token);
        res.send({
            error: null,
            success: {
                message: "Token invalidated successfully"
            }
        });
        res.end();
    })
}