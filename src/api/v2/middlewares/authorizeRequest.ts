import { Request, Response, NextFunction } from "express";
import { getJwtToken, verifyPermissions } from "../../../services/authProvider";
import { cloneDeep } from "lodash";
import { db } from "../../../services/db";
/** High order function, it takes some permission parameters and returns a function middleware that will only pass
 *  the request if all parameters are found in the user token
 * @param {string[]} requiredPermissions - An set of roles with the form of `["permission1", "permission2"]` that the payload must have
 */
export default function authPermission(requiredPermissions: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = getJwtToken(req.headers.authorization);
    if (!token) {
      res.status(401);
      res.send({
        error: "Authorization JWT not provided",
        success: null,
      });
      res.end();
      return;
    }
    verifyPermissions(token, requiredPermissions)
      .then((payload: any) => {
        res.locals.payload = payload;
        next();
      })
      .catch((error: any) => {
        res.status(403);
        res.send({
          error,
          success: null,
        });
        res.end();
      });
  };
}
