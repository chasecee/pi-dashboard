//app/api/list-blobs/route.js
import { list } from "@vercel/blob";

export const config = {
  runtime: "edge", // Use the Edge runtime for improved performance
};

export async function GET() {
  try {
    const response = await list({
      // Optional: Include parameters like `prefix` to filter blobs by folder, or `limit` to limit the number of returned blobs
    });

    // Return the list of blobs
    return new Response(JSON.stringify(response), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    // Handle any errors that occur during the fetch
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
