type Drop = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  delay?: string;
};

type RainDropsProps = {
  drops: Drop[];
  strokeWidth?: number;
  duration?: string;
  opacity?: number;
};

export default function RainDrops({
  drops,
  strokeWidth = 4,
  duration = "2.2s",
  opacity = 1,
}: RainDropsProps) {
  return (
    <>
      {drops.map((drop, i) => (
        <line
          key={i}
          x1={drop.x1}
          y1={drop.y1}
          x2={drop.x2}
          y2={drop.y2}
          stroke="#8ac4cf"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          opacity={opacity}
          style={{
            animation: `weather-fall ${duration} linear ${drop.delay ?? "0s"} infinite`,
          }}
        />
      ))}
    </>
  );
}
