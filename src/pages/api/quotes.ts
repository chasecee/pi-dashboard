export const prerender = false;

export async function GET() {
  try {
    const response = await fetch("https://zenquotes.io/api/random");

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
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
