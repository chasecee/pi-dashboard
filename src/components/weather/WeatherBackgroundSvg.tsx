import type { CSSProperties, ReactNode } from "react";

type WeatherBackgroundSvgProps = {
  animated?: boolean;
  className?: string;
  children: ReactNode;
};

export default function WeatherBackgroundSvg({
  animated = true,
  className,
  children,
}: WeatherBackgroundSvgProps) {
  const style = {
    "--play": animated ? "running" : "paused",
  } as CSSProperties;

  return (
    <svg
      data-weather-bg
      viewBox="0 0 320 180"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      className={className}
      style={style}
    >
      {children}
    </svg>
  );
}
