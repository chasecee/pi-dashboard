type Flake = {
  cx: number;
  cy: number;
  r: number;
  delay?: string;
};

type SnowflakesProps = {
  flakes: Flake[];
  duration?: string;
};

export default function Snowflakes({
  flakes,
  duration = "5.2s",
}: SnowflakesProps) {
  return (
    <>
      {flakes.map((flake, i) => (
        <circle
          key={i}
          cx={flake.cx}
          cy={flake.cy}
          r={flake.r}
          fill="#dfe9ec"
          style={{
            animation: `weather-snowfall ${duration} linear ${flake.delay ?? "0s"} infinite`,
          }}
        />
      ))}
    </>
  );
}
