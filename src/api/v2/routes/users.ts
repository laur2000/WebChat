import { Router, Request, Response, NextFunction } from "express";
import authenticate from "../middlewares/authenticateUser";
import ChannelProvider from "../../../services/channelProvider";
import UserProvider from "../../../services/userProvider";
import { write } from "fs";
const route = Router();

export default (app: Router) => {
  app.use("/users", route);

  route.post(
    "/",
    authenticate,
    (req: Request, res: Response, next: NextFunction) => {
      const user = res.locals.user;
      const userData = {
        email: user.email,
        email_verified: user.emailVerified,
      };
      UserProvider.insertUser(userData)
        .then((writeOp) => {
          res.send({
            error: null,
            success: writeOp.result,
          });
          res.end();
        })
        .catch((error) => {
          res.send({
            error,
            success: null,
          });
          res.end();
        });
    }
  );

  route.get(
    "/@me",
    authenticate,
    (req: Request, res: Response, next: NextFunction) => {
      const user = res.locals.user;
      res.send(user);
      res.end();
    }
  );

  route.patch(
    "/@me",
    authenticate,
    async (req: Request, res: Response, next: NextFunction) => {
      const payload = req.body;
      const user = res.locals.user;
      const updatedUser: { [key: string]: any } = {};

      updatedUser.email = user.email;
      if (user.should_verify_email) {
        updatedUser.email_verified = true;
      }
      if (payload) {
        if (payload.username) {
          updatedUser.username = payload.username;
        }
        if (payload.avatar) {
          updatedUser.avatar = payload.avatar;
        }
      }
      console.log(updatedUser);
      UserProvider.updateUser(updatedUser)
        .then((operation) => {
          res.send({
            error: null,
            success: operation.value,
          });
          res.end();
        })
        .catch((error) => {
          res.send({
            error,
            success: null,
          });
          res.end();
        });
    }
  );

  route.delete(
    "/:channelId",
    async (req: Request, res: Response, next: NextFunction) => {
      const channelId = req.params.channelId;
      const payload = req.body;
      const secret = await ChannelProvider.getChannelSecret(channelId);
      if (payload && payload.secret && payload.secret == secret) {
        const channel = await ChannelProvider.removeChannel(channelId);
        res.send({
          error: null,
          success: channel,
        });
        res.end();
      } else {
        res.status(404);
        res.send({
          error: "Channel does not exist or secret is not valid",
          success: null,
        });
        res.end();
      }
    }
  );
};
