export const runtime = "edge";
export const revalidate = 86400;

export async function GET() {
  try {
    // Use HTTPS for the external API call
    const response = await fetch("https://zenquotes.io/api/random", {
      next: { revalidate: 86400 },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=172800",
      },
    });
  } catch (error) {
    console.error("Error fetching quote:", error);
    return new Response(JSON.stringify({ message: "Error fetching quote" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    });
  }
}
