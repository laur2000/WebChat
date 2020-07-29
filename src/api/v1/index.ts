import { Router } from "express";
import channels from "./routes/channels";
import chat from "./routes/chat";
import signToken from "./routes/tokens";
import bodyParser from "body-parser";
import { EventEmitter } from "events";
import notFound from "./routes/notFound";

export default (server: any) => {
  const app = Router();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  channels(app);
  signToken(app);
  notFound(app);
  chat(server);

  return app;
};
