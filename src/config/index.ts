import fs from "fs";
require("dotenv").config();

const privateKey = fs.readFileSync(process.env.KEY_DIR);
const cert = fs.readFileSync(process.env.CERT_DIR);

export default {
  credentials: {
    key: privateKey,
    cert: cert,
  },
  PORT: process.env.PORT,
  AUDIENCE: process.env.AUDIENCE,
  ISSUER: process.env.ISSUER,
  RSA_URL: process.env.RSA_URL,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
};

export interface IProcessEnv {
  KEY_DIR: string;
  CERT_DIR: string;
  RSA_URL: string;
  ISSUER: string;
  AUDIENCE: string;
  PORT: number;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_NAME: string;
}

declare global {
  namespace NodeJS {
    interface ProcessEnv extends IProcessEnv {}
  }
}
