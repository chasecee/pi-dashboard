// utils/openai.ts
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Use environment variable for API key
  dangerouslyAllowBrowser: true,
});

export async function generateImage(prompt: string): Promise<any> {
  try {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1024x1024",
    });
    console.log("Response data:", response.data); // Add this line for debugging
    return response.data;
  } catch (error) {
    console.error("Detailed error:", error); // Enhanced error logging
    throw error;
  }
}
