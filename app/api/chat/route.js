// app/api/chat/route.ts
import { OpenAIStream, StreamingTextResponse } from "ai";
import OpenAI from "openai";

const perplexity = new OpenAI({
  apiKey: process.env.OPENAI_KEY || "",
  baseUrl: "https://api.perplexity.ai",
});
export const runtime = "edge";
export async function POST(req) {
  // Extract the `messages` from the body of the request
  const { messages } = await req.json();

  // Request the OpenAI-compatible API for the response based on the prompt
  const response = await perplexity.chat.completions.create({
    model: "gpt-3.5-turbo",
    stream: true,
    messages: messages,
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);

  // Respond with the stream
  return new StreamingTextResponse(stream);
}
