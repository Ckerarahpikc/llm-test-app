const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { GoogleGenAI } = require("@google/genai");
require("dotenv").config({ path: "./.env" });

// APPLICATION SETUP
const app = express();
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// INITIALIZE UNIFIED GEMINI SDK
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ status: "Message is required" });
    }

    // generate the content using sdk syntax
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: message,
    });

    res.json({ reply: response.text });
  } catch (err) {
    res.status(500).json({ status: "Something went wrong." });
  }
});

const PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
  console.log(`> ✅ App running on http://localhost:${PORT}`);
});
