const CLOUD_PATH =
  "M25 40 a15 15 0 0 1 0 -30 a20 20 0 0 1 38 -8 a15 15 0 0 1 27 10 a14 14 0 0 1 0 28 z";

type CloudProps = {
  x: number;
  y: number;
  scale?: number;
  fill: string;
  opacity?: number;
  animation?: "floaty" | "fogdrift" | "none";
  duration?: string;
  delay?: string;
};

export default function Cloud({
  x,
  y,
  scale = 1,
  fill,
  opacity = 1,
  animation = "floaty",
  duration = "12s",
  delay = "0s",
}: CloudProps) {
  const style =
    animation === "none"
      ? undefined
      : {
          animation: `weather-${animation} ${duration} ease-in-out ${delay} infinite`,
        };

  return (
    <g transform={`translate(${x},${y}) scale(${scale})`} opacity={opacity}>
      <g style={style}>
        <path d={CLOUD_PATH} fill={fill} />
      </g>
    </g>
  );
}
