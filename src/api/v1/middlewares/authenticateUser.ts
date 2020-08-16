import { Request, Response, NextFunction } from "express";
import { getJwtToken, authenticate } from "../../../services/authProvider";
export default function authenticateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = getJwtToken(req.headers.authorization);
  if (!token) {
    res.status(401);
    res.send({
      error: "TokenID not provided",
      success: null,
    });
    res.end();
    return;
  }
  authenticate(token)
    .then((user) => {
      res.locals.user = user;
      next();
    })
    .catch((error) => {
      res.status(403);
      res.send({
        error,
        success: null,
      });
      res.end();
    });
}
