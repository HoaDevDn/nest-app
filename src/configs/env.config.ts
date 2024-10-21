import { config as dotenvConfig } from 'dotenv';

dotenvConfig({ path: '.env' });
let isTest = process.env.NODE_ENV === 'test';
const ROOT_PATH = process.cwd() + (isTest ? '/src' : '');

export const env = {
  ROOT_PATH,
  PORT: process.env.PORT || 3000,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  MAIL_JET_USER: process.env.MAIL_JET_USER,
  MAIL_JET_PASSWORD: process.env.MAIL_JET_PASSWORD,
  DB_NAME: process.env.DB_NAME,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_PORT: process.env.DB_PORT,
  DB_HOST: process.env.DB_HOST,
};
