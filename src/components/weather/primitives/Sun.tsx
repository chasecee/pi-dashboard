type Ray = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
};

type SunProps = {
  cx: number;
  cy: number;
  r: number;
  rays: Ray[];
  spin?: boolean;
  strokeWidth?: number;
};

export default function Sun({
  cx,
  cy,
  r,
  rays,
  spin = false,
  strokeWidth = 5,
}: SunProps) {
  return (
    <>
      <g
        style={
          spin
            ? {
                transformBox: "fill-box",
                transformOrigin: "center",
                animation: "weather-spin 140s linear infinite",
              }
            : undefined
        }
      >
        {rays.map((ray, i) => (
          <line
            key={i}
            x1={ray.x1}
            y1={ray.y1}
            x2={ray.x2}
            y2={ray.y2}
            stroke="#e8c877"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
        ))}
      </g>
      <circle cx={cx} cy={cy} r={r} fill="#e8c877" />
    </>
  );
}
