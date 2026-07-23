import Cloud from "../primitives/Cloud";
import RainDrops from "../primitives/RainDrops";

export default function Sleet() {
  return (
    <>
      <Cloud x={-42} y={42} scale={1.3} fill="#57737a" />
      <circle
        cx={18}
        cy={114}
        r={4}
        fill="#cfe4e8"
        style={{ animation: "weather-fall 2s linear infinite" }}
      />
      <RainDrops
        duration="2s"
        drops={[
          { x1: 48, y1: 112, x2: 44, y2: 124, delay: "0.8s" },
          { x1: 288, y1: 90, x2: 284, y2: 102, delay: "0.4s" },
        ]}
      />
      <circle
        cx={72}
        cy={114}
        r={4}
        fill="#cfe4e8"
        style={{ animation: "weather-fall 2s linear 1.4s infinite" }}
      />
      <Cloud x={258} y={34} scale={1.05} fill="#57737a" delay="2s" />
      <circle
        cx={312}
        cy={92}
        r={4}
        fill="#cfe4e8"
        style={{ animation: "weather-fall 2s linear 1s infinite" }}
      />
    </>
  );
}
