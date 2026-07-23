import { useEffect, useState, type ComponentType } from "react";
import type { WeatherCondition } from "./types";
import WeatherBackgroundSvg from "./WeatherBackgroundSvg";
import ClearDay from "./variants/ClearDay";
import ClearNight from "./variants/ClearNight";
import PartlyCloudyDay from "./variants/PartlyCloudyDay";
import PartlyCloudyNight from "./variants/PartlyCloudyNight";
import Cloudy from "./variants/Cloudy";
import Rain from "./variants/Rain";
import Drizzle from "./variants/Drizzle";
import Thunderstorm from "./variants/Thunderstorm";
import Snow from "./variants/Snow";
import Sleet from "./variants/Sleet";
import Fog from "./variants/Fog";
import Wind from "./variants/Wind";

const POLL_MS = 15 * 60 * 1000;

const VARIANTS: Record<WeatherCondition, ComponentType> = {
  "clear-day": ClearDay,
  "clear-night": ClearNight,
  "partly-cloudy-day": PartlyCloudyDay,
  "partly-cloudy-night": PartlyCloudyNight,
  cloudy: Cloudy,
  rain: Rain,
  drizzle: Drizzle,
  thunderstorm: Thunderstorm,
  snow: Snow,
  sleet: Sleet,
  fog: Fog,
  wind: Wind,
};

type WeatherBackgroundProps = {
  className?: string;
  animated?: boolean;
  condition?: WeatherCondition;
};

export default function WeatherBackground({
  className,
  animated = true,
  condition: conditionProp,
}: WeatherBackgroundProps) {
  const [condition, setCondition] = useState<WeatherCondition | null>(
    conditionProp ?? null,
  );

  useEffect(() => {
    if (conditionProp) {
      setCondition(conditionProp);
      return;
    }

    let cancelled = false;

    const load = async () => {
      const res = await fetch("/api/weather");
      if (!res.ok || cancelled) return;
      const data = await res.json();
      if (!cancelled && data.condition) {
        setCondition(data.condition);
      }
    };

    load();
    const id = setInterval(load, POLL_MS);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [conditionProp]);

  if (!condition) {
    return <div className={className} aria-hidden="true" />;
  }

  const Variant = VARIANTS[condition];

  return (
    <div className={`${className}  mix-blend-overlay`} aria-hidden="true">
      <WeatherBackgroundSvg animated={animated} >
        <Variant />
      </WeatherBackgroundSvg>
    </div>
  );
}
