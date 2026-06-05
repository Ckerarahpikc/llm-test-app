const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const { createGoogleGenerativeAI } = require("@ai-sdk/google");
const {
  streamText,
  convertToModelMessages,
  convertToDataStreamResponse,
} = require("ai");
require("dotenv").config({ path: "./.env" });

// APPLICATION SETUP
const app = express();
app.use(cors());
app.use(express.json());
app.use(logger("dev"));

const google = createGoogleGenerativeAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
});

// INITIALIZE UNIFIED GEMINI SDK
app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;

    const modelMessage = await convertToModelMessages(messages);

    // generate the content using sdk syntax
    const result = streamText({
      model: google("gemini-2.5-flash"),
      messages: modelMessage,
    });

    result.pipeUIMessageStreamToResponse(res);
  } catch (err) {
    res.status(500).json({ status: "Something went wrong." });
  }
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`> ✅ App running on http://localhost:${PORT}`);
});
