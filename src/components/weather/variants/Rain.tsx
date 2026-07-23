import Cloud from "../primitives/Cloud";
import RainDrops from "../primitives/RainDrops";

export default function Rain() {
  return (
    <>
      <Cloud x={-42} y={42} scale={1.3} fill="#57737a" />
      <RainDrops
        drops={[
          { x1: 16, y1: 112, x2: 12, y2: 126 },
          { x1: 44, y1: 112, x2: 40, y2: 126, delay: "0.7s" },
          { x1: 72, y1: 112, x2: 68, y2: 126, delay: "1.4s" },
        ]}
      />
      <Cloud x={258} y={34} scale={1.05} fill="#57737a" delay="2s" />
      <RainDrops
        drops={[
          { x1: 284, y1: 90, x2: 280, y2: 104, delay: "0.4s" },
          { x1: 310, y1: 90, x2: 306, y2: 104, delay: "1.1s" },
        ]}
      />
    </>
  );
}
