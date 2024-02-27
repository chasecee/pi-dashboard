// app/api/generate-image/route.js
export const runtime = "edge";
export const dynamic = "force-dynamic";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const { prompt } = req.body || {};
    const defaultPrompt = "a default image description"; // Default prompt
    const response = await openai.images.generate({
      model: "dall-e-2",
      prompt: prompt || defaultPrompt,
      n: 1,
      size: "512x512",
    });

    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error generating image:", error);
    return new Response(JSON.stringify({ message: "Error generating image" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
