import { Router, Request, Response, NextFunction } from "express";
import authorize from "../middlewares/authorizeRequest";
import ChannelProvider from "../../../services/channelProvider";
const route = Router();

export default (app: Router) => {
  app.use("/channel", route);

  route.get(
    "/:channelId",
    authorize(["channel:read"]),
    async (req: Request, res: Response, next: NextFunction) => {
      const channelId = req.params.channelId;
      try {
        const channel = await ChannelProvider.getChannel(channelId);
        if (!channel) throw new Error("Channel not found");
        res.send({
          error: null,
          success: channel,
        });
        res.end();
      } catch (error) {
        res.status(404);
        res.send({
          error: "Channel not found",
          success: null,
        });
        res.end();
      }
    }
  );

  route.post("/", (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    if (!payload || !payload.secret) {
      res.status(400);
      res.send({
        error: "Payload secret was not providen",
        success: null,
      });
      res.end();
    } else {
      if (payload._id) {
        delete payload._id;
      }
      ChannelProvider.addChannel(payload)
        .then((channel: any) => {
          res.status(201);
          res.send({
            error: null,
            success: channel,
          });
          res.end();
        })
        .catch(() => {
          res.status(400);
          res.send({
            error: "Invalid character . inside keys",
            success: null,
          });
          res.send();
        });
    }
  });

  route.patch(
    "/:channelId",
    authorize(["channel:write"]),
    async (req: Request, res: Response, next: NextFunction) => {
      const payload = req.body;
      const channelId = req.params.channelId;
      if (!payload || Object.keys(payload).length == 0) {
        res.status(400);
        res.send({
          error: "Payload is empty",
          success: null,
        });
        res.end();
      } else if (payload.secret) {
        res.status(403);
        res.send({
          error: "Secret cannot be modified in this endpoint",
          success: null,
        });
        res.end();
      } else {
        try {
          const channel = await ChannelProvider.updateChannel(
            channelId,
            payload
          );

          res.send({
            error: null,
            success: channel,
          });
          res.end();
        } catch (error) {
          res.status(404);
          res.send({
            error: "Channel not Found",
            success: null,
          });
          res.end();
        }
      }
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
