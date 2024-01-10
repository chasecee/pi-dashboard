import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const apiUrl = process.env.HOME_ASSISTANT_API_URL || "default_api_url";
const token = process.env.HOME_ASSISTANT_API_TOKEN || "default_token";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/api/logbook")) {
    const newRequest = new Request(apiUrl, {
      method: request.method,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: request.method !== "GET" ? request.body : undefined,
    });

    try {
      const response = await fetch(newRequest);
      const data = await response.text(); // Read the response as text

      // Log the full response data
      // console.log(data);

      // Return the response from the Home Assistant API
      return new NextResponse(data, {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      return new NextResponse("Error fetching data", { status: 500 });
    }
  }

  return NextResponse.next();
}
