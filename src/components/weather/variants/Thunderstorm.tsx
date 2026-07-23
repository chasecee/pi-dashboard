import Cloud from "../primitives/Cloud";
import Lightning from "../primitives/Lightning";
import RainDrops from "../primitives/RainDrops";

export default function Thunderstorm() {
  return (
    <>
      <Cloud x={-42} y={38} scale={1.3} fill="#3b5258" />
      <Lightning points="48,102 28,134 41,134 32,160 62,124 47,124" />
      <Cloud x={258} y={32} scale={1.05} fill="#3b5258" delay="2s" />
      <RainDrops
        duration="2s"
        drops={[
          { x1: 286, y1: 88, x2: 282, y2: 100, delay: "0.4s" },
          { x1: 312, y1: 88, x2: 308, y2: 100, delay: "1.2s" },
        ]}
      />
    </>
  );
}
