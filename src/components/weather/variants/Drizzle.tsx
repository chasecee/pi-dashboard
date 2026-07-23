import Cloud from "../primitives/Cloud";
import RainDrops from "../primitives/RainDrops";

export default function Drizzle() {
  return (
    <>
      <Cloud x={-42} y={42} scale={1.3} fill="#8ac4cf" />
      <RainDrops
        strokeWidth={3}
        duration="3.2s"
        opacity={0.7}
        drops={[
          { x1: 20, y1: 112, x2: 18, y2: 119 },
          { x1: 58, y1: 112, x2: 56, y2: 119, delay: "1.2s" },
          { x1: 292, y1: 90, x2: 290, y2: 97, delay: "2.2s" },
        ]}
      />
      <Cloud x={258} y={34} scale={1.05} fill="#8ac4cf" delay="2s" />
    </>
  );
}
