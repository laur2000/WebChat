import fs from 'fs';
require('dotenv').config();

const privateKey = fs.readFileSync(process.env.KEY_DIR);
const cert = fs.readFileSync(process.env.CERT_DIR);

export default {
    credentials: {
        key: privateKey,
        cert: cert
    },
    PORT: process.env.PORT
}

export interface IProcessEnv {
    KEY_DIR: string
    CERT_DIR: string
    PORT: number
}

declare global {
    namespace NodeJS {
        interface ProcessEnv extends IProcessEnv { }
    }
}