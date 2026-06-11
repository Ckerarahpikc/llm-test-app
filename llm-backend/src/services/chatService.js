import createGoogleGenerativeAI from "@ai-sdk/google";
import {
  streamText,
  convertToModelMessages,
  convertToDataStreamResponse,
} from "ai";

const google = createGoogleGenerativeAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
});
