const { createGoogleGenerativeAI } = require("@ai-sdk/google");
const {
  streamText,
  convertToModelMessages,
  convertToDataStreamResponse,
} = require("ai");

const google = createGoogleGenerativeAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
});
