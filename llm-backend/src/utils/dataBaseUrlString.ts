import { config } from "dotenv";
config();

const ev = process.env;
export const dataBaseUrlString = `postgresql://${ev.DB_USER}:${ev.DB_PASSWORD}@${ev.DB_HOST}:${ev.DB_PORT}/${ev.DB_STRING}`;
