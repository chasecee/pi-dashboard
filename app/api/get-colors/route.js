// app/api/get-colors/route.js
import { Vibrant } from "node-vibrant/node";

// This is your GET request handler.
export async function GET(req) {
  // Extract the imageUrl from the query parameters
  const url = new URL(req.url);
  const imageUrl = url.searchParams.get("imageUrl");

  if (!imageUrl) {
    return new Response(JSON.stringify({ error: "No image URL provided" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  try {
    const palette = await Vibrant.from(
      decodeURIComponent(imageUrl)
    ).getPalette();
    return new Response(JSON.stringify(palette), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Failed to extract colors:", error);
    return new Response(JSON.stringify({ error: "Failed to extract colors" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
