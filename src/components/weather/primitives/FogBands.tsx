type Band = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  opacity: number;
  duration: string;
  delay?: string;
  reverse?: boolean;
};

type FogBandsProps = {
  bands: Band[];
};

export default function FogBands({ bands }: FogBandsProps) {
  return (
    <>
      {bands.map((band, i) => (
        <line
          key={i}
          x1={band.x1}
          y1={band.y1}
          x2={band.x2}
          y2={band.y2}
          stroke="#7fa0a6"
          strokeWidth={9}
          strokeLinecap="round"
          opacity={band.opacity}
          style={{
            animation: `weather-fogdrift ${band.duration} ease-in-out ${band.delay ?? "0s"} ${band.reverse ? "reverse " : ""}infinite`,
          }}
        />
      ))}
    </>
  );
}
