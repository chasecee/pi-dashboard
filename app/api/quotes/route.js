// Ensure the path and filename are correct for your app's structure
export const runtime = "edge";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // Use HTTPS for the external API call
    const response = await fetch("http://api.quotable.io/random", {
      headers: {
        "Cache-Control": "no-store",
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch (error) {
    console.error("Error fetching quote:", error);
    return new Response(JSON.stringify({ message: "Error fetching quote" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store, max-age=0",
      },
    });
  }
}
