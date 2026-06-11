import express from "express";
import cors from "cors";
import logger from "morgan";
import dotenv from "dotenv";
dotenv.config();

import chatRoute from "./routes/chatRoute.js";
import authRoute from "./routes/authRoute.js";
import GECC from "./controllers/GECC.js";

// CONFIGURE APPLICATION
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL_STRING,
  }),
);
app.use(logger("dev"));

// ROOT ROUTES
app.use("/api/v1/chat", chatRoute);
app.use("/api/v1/users", authRoute);
app.use(/(.*)/, GECC); // global error catch controller

export default app;
