import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

import { dataBaseUrlString } from "./../utils/dataBaseUrlString.ts";
dotenv.config();

// creating a pool using database raw string (idk if it's working)
const pool = new Pool({
  connectionString: dataBaseUrlString,
});

// create adaptor and wrap it into the PrismaClient
const adapter = new PrismaPg(pool);

// now export the prisma client
export const prisma = new PrismaClient({
  log:
    process.env.NODE_ENV === "development"
      ? ["warn", "query", "error"]
      : ["error"],
  adapter,
});
