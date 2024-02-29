// app/api/store-and-display-image/route.js
import { put } from "@vercel/blob";
import fetch from "node-fetch";
import OpenAI from "openai";
import sharp from "sharp"; // Import sharp

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Rate limiting setup
let lastRequestTime = 0;
const twelveHoursInMilliseconds = 1 * 2 * 60 * 1000; // 12 hours in milliseconds
// Generate a safe filename from the prompt
function sanitizeFilename(prompt) {
  return prompt.replace(/[^a-z0-9]/gi, "_").toLowerCase(); // Replace non-alphanumeric characters with underscores
}
export async function POST(req) {
  const currentTime = Date.now();
  if (
    lastRequestTime &&
    currentTime - lastRequestTime < twelveHoursInMilliseconds
  ) {
    return new Response(
      JSON.stringify({
        message: "Request rate-limited. Please try again later.",
      }),
      {
        status: 429, // HTTP status code for Too Many Requests
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  try {
    const { prompt } = await req.json();
    const defaultPrompt = "a default image description"; // Default prompt, customize as needed

    // Generate image with OpenAI
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt || defaultPrompt,
      n: 1,
      size: "1024x1024",
    });

    console.log("OpenAI response:", JSON.stringify(response, null, 2));

    // Correctly accessing the URL from the OpenAI response
    const imageUrl = response.data[0].url;

    const imageResponse = await fetch(imageUrl);
    if (!imageResponse.ok) throw new Error("Failed to fetch generated image");

    const imageBuffer = await imageResponse.buffer();

    // Compress the image using sharp
    const compressedImageBuffer = await sharp(imageBuffer)
      .jpeg({ quality: 80 }) // Adjust the quality as needed
      .toBuffer();

    const safePrompt = sanitizeFilename(prompt || defaultPrompt);
    const filename = `generated-image-${safePrompt}-${Date.now()}.jpeg`;

    const blob = await put(filename, compressedImageBuffer, {
      access: "public",
      addRandomSuffix: false,
    });

    // Update the lastRequestTime after a successful operation
    lastRequestTime = Date.now();

    // Return the Blob URL for the stored image
    return new Response(JSON.stringify({ blobUrl: blob.url }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error in generating or storing image:", error);
    return new Response(
      JSON.stringify({
        message: "Error in processing request",
        error: error.message,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
