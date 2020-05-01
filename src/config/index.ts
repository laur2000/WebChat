import fs from 'fs';
require('dotenv').config();

const privateKey = fs.readFileSync(process.env.KEY_DIR);
const cert = fs.readFileSync(process.env.CERT_DIR);

export const credentials = {
    key: privateKey,
    cert: cert
}

export interface IProcessEnv {
    KEY_DIR: string
    CERT_DIR: string
    PORT: number
    JWT_SECRET: string
}

declare global {
    namespace NodeJS {
        interface ProcessEnv extends IProcessEnv { }
    }
}