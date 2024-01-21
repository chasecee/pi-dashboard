//app/api/randomFact/route.js
export async function GET() {
  try {
    const response = await fetch(
      `https://api.adviceslip.com/advice?_=${Date.now()}`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        // Set cache-control headers to no-store to prevent caching
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch (error) {
    console.error("Error fetching fact:", error);
    return new Response(JSON.stringify({ message: "Error fetching fact" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        // Set cache-control headers to no-store to prevent caching
        "Cache-Control": "no-store, max-age=0",
      },
    });
  }
}
