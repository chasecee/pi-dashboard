import type { WeatherCondition } from "../components/weather/types";

const WIND_THRESHOLD_KMH = 40;

export function resolveWeatherCondition(
  weatherCode: number,
  isDay: boolean,
  windSpeedKmh: number,
): WeatherCondition {
  if ([56, 57, 66, 67, 77].includes(weatherCode)) {
    return "sleet";
  }

  if (weatherCode >= 95 && weatherCode <= 99) {
    return "thunderstorm";
  }

  if (
    (weatherCode >= 71 && weatherCode <= 76) ||
    weatherCode === 85 ||
    weatherCode === 86
  ) {
    return "snow";
  }

  if (
    (weatherCode >= 61 && weatherCode <= 65) ||
    (weatherCode >= 80 && weatherCode <= 82)
  ) {
    return "rain";
  }

  if (weatherCode >= 51 && weatherCode <= 55) {
    return "drizzle";
  }

  if (weatherCode === 45 || weatherCode === 48) {
    return "fog";
  }

  if (weatherCode === 3) {
    if (windSpeedKmh >= WIND_THRESHOLD_KMH) return "wind";
    return "cloudy";
  }

  if (weatherCode === 1 || weatherCode === 2) {
    if (windSpeedKmh >= WIND_THRESHOLD_KMH) return "wind";
    return isDay ? "partly-cloudy-day" : "partly-cloudy-night";
  }

  if (weatherCode === 0) {
    if (windSpeedKmh >= WIND_THRESHOLD_KMH) return "wind";
    return isDay ? "clear-day" : "clear-night";
  }

  if (windSpeedKmh >= WIND_THRESHOLD_KMH) return "wind";
  return "cloudy";
}
