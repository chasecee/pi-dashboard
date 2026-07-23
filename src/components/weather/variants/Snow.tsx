import Cloud from "../primitives/Cloud";
import Snowflakes from "../primitives/Snowflakes";

export default function Snow() {
  return (
    <>
      <Cloud x={-42} y={42} scale={1.3} fill="#8ac4cf" />
      <Snowflakes
        flakes={[
          { cx: 14, cy: 112, r: 3.5 },
          { cx: 42, cy: 112, r: 3, delay: "1.6s" },
          { cx: 68, cy: 112, r: 3.5, delay: "3s" },
          { cx: 284, cy: 90, r: 3, delay: "0.8s" },
          { cx: 310, cy: 90, r: 3.5, delay: "3.8s" },
        ]}
      />
      <Cloud x={258} y={34} scale={1.05} fill="#8ac4cf" delay="2s" />
    </>
  );
}
