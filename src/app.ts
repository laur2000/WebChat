import env from "./config";
import express from "express";
import http from "http";
import routes from "./api/v1";
import path from "path";
import { initDB } from "./services/db";
const cors = require("cors");

(async () => {
  const app = express();
  await initDB();

  const server = http.createServer(app).listen(env.PORT, () => {
    console.log(`
      ################################################
          🛡️  Server listening on port: ${env.PORT} 🛡️ 
      ################################################
      `);
  });

  app.use(cors());
  app.use("/api/v1", routes(server));

  //Serve public files
  app.use(express.static("dist"));

  //Request that are not made to the api will be redirected to frontend
  app.get("*", (req, res) => {
    res.sendFile("dist/index.html", {
      root: __dirname + "/../",
    });
  });
})().catch(console.error);
