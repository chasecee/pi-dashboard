export type WeatherCondition =
  | "clear-day"
  | "clear-night"
  | "partly-cloudy-day"
  | "partly-cloudy-night"
  | "cloudy"
  | "rain"
  | "drizzle"
  | "thunderstorm"
  | "snow"
  | "sleet"
  | "fog"
  | "wind";

export const WEATHER_CONDITIONS: WeatherCondition[] = [
  "clear-day",
  "clear-night",
  "partly-cloudy-day",
  "partly-cloudy-night",
  "cloudy",
  "rain",
  "drizzle",
  "thunderstorm",
  "snow",
  "sleet",
  "fog",
  "wind",
];

export const NIGHT_MASK = "#171027";
