require("dotenv").config({ path: "./.env" });
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function testGemini() {
  try {
    console.log(
      "Checking API Key...",
      !!process.env.GEMINI_API_KEY ? "Found!" : "MISSING!",
    );

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Say hello world!",
    });

    console.log("Success! Gemini says:", response.text);
  } catch (error) {
    console.error("FAILURE. The exact error is:", error);
  }
}

testGemini();
