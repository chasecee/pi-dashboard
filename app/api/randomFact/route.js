//app/api/randomFact/route.js
export const runtime = "edge";
export async function GET() {
  try {
    const timestamp = Date.now();
    const response = await fetch(
      `https://api.adviceslip.com/advice?timestamp=${timestamp}`,
      {
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not okk");
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
    console.error("Error fetching fact:", error);
    return new Response(JSON.stringify({ message: "Error fetching fact" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store, max-age=0",
      },
    });
  }
}
