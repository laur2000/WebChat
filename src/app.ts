import { credentials } from './config';
import express from 'express';
import https from 'https'
import routes from './api';

const app = express();
const server = https.createServer(credentials, app);


app.use('/', routes(server));

server.listen(process.env.PORT, () => {
    console.log(`
    ################################################
        🛡️  Server listening on port: ${process.env.PORT} 🛡️ 
    ################################################
    `);
});
