import * as dotenv from 'dotenv';
import * as fs from 'fs';

dotenv.config();
const privateKey = fs.readFileSync(process.env.JWT_PRIVATE_KEY_PATH);
const publicKey = fs.readFileSync(process.env.JWT_PUBLIC_KEY_PATH);

const ConfigEnv = {
  APP_DEV_MODE: process.env.APP_DEV_MODE,
  API_SERVER_URL: process.env.API_SERVER_URL,
  API_SERVER_PORT: process.env.API_SERVER_PORT,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
  DB_DRIVER: process.env.DB_DRIVER,
  DOCS_GENERATE: process.env.DOCS_GENERATE,
  DOCS_PATH: process.env.DOCS_PATH,
  DOCS_VERSION: process.env.DOCS_VERSION,
  DOCS_TITLE: process.env.DOCS_TITLE,
  DOCS_DESCRIPTION: process.env.DOCS_DESCRIPTION,
  APP_DEFAULT_TIMEOUT: Number(process.env.APP_DEFAULT_TIMEOUT),
  TOKEN_EXPIRES_IN: Number(process.env.TOKEN_EXPIRES_IN),
  JWT_SECRET: privateKey,
  JWT_PUBLIC: publicKey,
};
export default ConfigEnv;
