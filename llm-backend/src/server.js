import dotenv from "dotenv";
dotenv.config();

import { prisma } from "./db/index.js";
import app from "./app.js";

// CONNECTION TO DB
const PORT = process.env.PORT || 2000;

prisma
  .$connect()
  .then(() => {
    console.log("> DB Connected Successfully.");

    // BOOTING THE EXPRESS SERVER
    app.listen(PORT, () => {
      console.log(`> Application running on http://localhost:${PORT}`);
    });
  })
  // CATCHING CONNECTION ERRORS ON STARTUP
  .catch((err) => {
    console.error("> Something went wrong:", err);
    process.exit(1);
  });
