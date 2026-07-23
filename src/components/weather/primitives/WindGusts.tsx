type Gust = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  dasharray: string;
  opacity?: number;
  duration: string;
};

type WindGustsProps = {
  gusts: Gust[];
};

export default function WindGusts({ gusts }: WindGustsProps) {
  return (
    <>
      {gusts.map((gust, i) => (
        <line
          key={i}
          x1={gust.x1}
          y1={gust.y1}
          x2={gust.x2}
          y2={gust.y2}
          stroke="#8ac4cf"
          strokeWidth={5}
          strokeLinecap="round"
          strokeDasharray={gust.dasharray}
          opacity={gust.opacity ?? 1}
          style={{
            animation: `weather-gust ${gust.duration} linear infinite`,
          }}
        />
      ))}
    </>
  );
}
