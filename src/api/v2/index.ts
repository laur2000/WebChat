import { Router } from "express";
import channels from "./routes/channels";
import chat from "./routes/chat";
import signToken from "./routes/tokens";
import bodyParser from "body-parser";
import { EventEmitter } from "events";
import users from "./routes/users";
import notFound from "./routes/notFound";

export default () => {
  const app = Router();
  app.use(bodyParser.json({ limit: "10mb" }));
  app.use(bodyParser.urlencoded({ extended: true }));
  channels(app);
  signToken(app);
  users(app);
  //Not found route must be used last, otherwise it will block all requests to the previous routes
  notFound(app);
  
  chat();

  return app;
};
