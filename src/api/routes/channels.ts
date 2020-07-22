import { Router, Request, Response, NextFunction } from "express";
import auth from "../middlewares/authRequest";
import ChannelProvider from "../../services/channelProvider";
const route = Router();

export default (app: Router) => {
  app.use("/channel", route);

  route.get(
    "/:channelId",
    auth("ch:read"),
    (req: Request, res: Response, next: NextFunction) => {
      const channelId = req.params.channelId;
      if (ChannelProvider.channelExist(channelId)) {
        const channel = ChannelProvider.getChannel(channelId);
        res.send({
          error: null,
          success: {
            name: channel.getName(),
            description: channel.getDescription(),
            users: channel.getUsersArray(),
          },
        });
        res.end();
      } else {
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
      const channel = ChannelProvider.addChannel(
        payload.secret,
        payload.name,
        payload.description
      );
      res.send({
        error: null,
        success: {
          id: channel.getId(),
          name: channel.getName(),
          description: channel.getDescription(),
        },
      });
      res.end();
    }
  });

  route.patch(
    "/:channelId",
    auth("ch:read", "ch:edit"),
    (req: Request, res: Response, next: NextFunction) => {
      const payload = req.body;
      const channelId = req.params.channelId;
      if (!payload || Object.keys(payload).length == 0) {
        res.status(400);
        res.send({
          error: "Payload is empty",
          success: null,
        });
        res.end();
      } else {
        const channel = ChannelProvider.getChannel(channelId);

        if (payload.name) channel.setName(payload.name);
        if (payload.description) channel.setDescription(payload.description);
        if (payload.secret) channel.setSecret(payload.secret);
        res.send({
          error: null,
          success: {
            name: channel.getName(),
            description: channel.getDescription(),
          },
        });
        res.end();
      }
    }
  );

  route.delete(
    "/:channelId",
    auth("ch:delete"),
    (req: Request, res: Response, next: NextFunction) => {
      const channelId = req.params.channelId;
      if (ChannelProvider.channelExist(channelId)) {
        const channel = ChannelProvider.getChannel(channelId);
        res.send({
          error: null,
          success: {
            name: channel.getName(),
            description: channel.getDescription(),
            users: channel.getUsersArray(),
          },
        });
        ChannelProvider.removeChannel(channelId);
        res.end();
      } else {
        res.status(404);
        res.send({
          error: "Channel not found",
          success: null,
        });
        res.end();
      }
    }
  );
};
