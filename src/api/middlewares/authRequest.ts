import { Request, Response, NextFunction } from 'express';
import { getToken, verify, decode } from '../../services/jwt';
import ChannelProvider from '../../services/channelProvider';

export default function authPermission(...required: any[]) {
    return (req: Request, res: Response, next: NextFunction) => {

        if (!req.headers.authorization) {
            res.status(401);
            res.send({
                error: "Authorization JWT not provided",
                success: null
            })
            res.end();
            return;
        }

        const token = getToken(req.headers.authorization);
        try {
            const payload = <any>decode(token);
            if (ChannelProvider.channelExist(payload.channel)) {
                verify(token, ChannelProvider.getChannelSecret(payload.channel))
                    .then(decoded => {
                        const roles = payload.roles;

                        let missingPermissions: any;
                        //Check if all required permission to access the route is found in the roles payload
                        if (!roles || (missingPermissions = findMissingPermissions(required, roles)).length != 0) {
                            const messages = missingPermissions ? missingPermissions : required;
                            res.status(403);
                            res.send({
                                error: "Forbidden access to resource, missing roles: " + messages.join(" "),
                                success: null
                            });
                            res.end();
                        }
                        else {
                            res.locals.payload = decoded;
                            next();
                        }

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
            else {
                res.status(404);
                res.send({
                    error: "Channel doesn't exist",
                    success: null
                });
                res.end();
            }

        }
        catch {
            res.status(401);
            res.send({
                error: "Payload is not provided",
                success: null
            });
            res.end();
        }

    }

}

function findMissingPermissions(required: string[], roles: string[]) {
    var permissions = [];
    for (let permission of required) {
        if (roles.indexOf(permission) < 0) {
            permissions.push(permission);
        }
    }
    return permissions;
}
