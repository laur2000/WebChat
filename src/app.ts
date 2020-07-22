import env from "./config";
import express from "express";
import http from "http";
import routes from "./api";
import path from "path";
const app = express();

const server = http.createServer(app).listen(env.PORT, () => {
  console.log(`
    ################################################
        🛡️  Server listening on port: ${env.PORT} 🛡️ 
    ################################################
    `);
});

app.use(require("cors")());
app.use("/api/v1", routes(server));
app.use(express.static("dist"));
app.get("*", (req, res) => {
  res.sendFile("dist/index.html", {
    root: __dirname + "/../",
  });
});
