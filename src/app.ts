import env from "./config";
import express from "express";
import http from "http";
import routesV1 from "./api/v1";
import routesV2 from "./api/v2";
import path from "path";
import { initDB } from "./services/db";
import { initSocket } from "./services/socketIO";
const cors = require("cors");

(async () => {
  const app = express();
  const server = http.createServer(app).listen(env.PORT, () => {
    console.log(`
      ################################################
          🛡️  Server listening on port: ${env.PORT} 🛡️ 
      ################################################
      `);
  });
  await initDB();
  initSocket(server);
  app.use(cors());
  app.use("/api/v1", routesV1());
  app.use("/api/v2", routesV2());

  //Serve public files
  app.use(express.static("dist"));

  //Request that are not made to the api will be redirected to frontend
  app.get("*", (req, res) => {
    res.sendFile("dist/index.html", {
      root: __dirname + "/../",
    });
  });
})().catch(console.error);
