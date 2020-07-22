import env from "./config";
import express from "express";
import http from "http";
import routes from "./api";

const app = express();

const server = http.createServer(app).listen(env.PORT, () => {
  console.log(`
    ################################################
        🛡️  Server listening on port: ${env.PORT} 🛡️ 
    ################################################
    `);
});

app.use(require("cors")());
app.use("/", routes(server));
app.use(express.static("dist"));
