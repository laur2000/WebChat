import { credentials } from './config';
import express, { Application, Request, Response, NextFunction } from 'express';
import https, { Server } from 'https'
import routes from './api';
const app: Application = express();
const server: Server = https.createServer(credentials, app);

app.use('/', routes());

server.listen(process.env.PORT, () => {
    console.log(`
    🔥🔥🔥🔥🔥
    Server started listening to port ${process.env.PORT}
    🔥🔥🔥🔥🔥
    `);
});
