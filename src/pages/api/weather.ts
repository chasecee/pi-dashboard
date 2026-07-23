import { resolveWeatherCondition } from "../../lib/weatherConditions";

export const prerender = false;

export async function GET() {
  const lat = import.meta.env.WEATHER_LAT;
  const lon = import.meta.env.WEATHER_LON;

  if (!lat || !lon) {
    return new Response(
      JSON.stringify({ message: "WEATHER_LAT and WEATHER_LON are required" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
        },
      },
    );
  }

  try {
    const url = new URL("https://api.open-meteo.com/v1/forecast");
    url.searchParams.set("latitude", lat);
    url.searchParams.set("longitude", lon);
    url.searchParams.set(
      "current",
      "weather_code,is_day,wind_speed_10m",
    );

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Open-Meteo ${response.status}`);
    }

    const data = await response.json();
    const current = data.current;

    const condition = resolveWeatherCondition(
      current.weather_code,
      current.is_day === 1,
      current.wind_speed_10m,
    );

    return new Response(JSON.stringify({ condition }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Error fetching weather:", error);
    return new Response(JSON.stringify({ message: "Error fetching weather" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
    });
  }
}
