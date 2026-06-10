const express = require("express");
const cors = require("cors");
const logger = require("morgan");
require("dotenv").config({ path: "./.env" });

const chatRoute = require("./routes/chatRoute");
const userRoute = require("./routes/userRoute");
const GECC = require("./controllers/GECC");

// CONFIGURE APPLICATION
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL_STRING,
  }),
);
app.use(logger("dev"));

// ROUTES
const router = express.Router();

app.use("/api/v1/chat", chatRoute);
app.use("/api/v1/users", userRoute);
app.use(/(.*)/, GECC); // global error catch controller

module.exports = app;
