import Cloud from "../primitives/Cloud";
import Sun from "../primitives/Sun";

export default function PartlyCloudyDay() {
  return (
    <>
      <Sun
        cx={0}
        cy={55}
        r={26}
        strokeWidth={4}
        rays={[
          { x1: 34, y1: 55, x2: 44, y2: 55 },
          { x1: 24, y1: 79, x2: 31, y2: 86 },
          { x1: 24, y1: 31, x2: 31, y2: 24 },
          { x1: 0, y1: 89, x2: 0, y2: 99 },
        ]}
      />
      <Cloud x={252} y={88} scale={1.25} fill="#8ac4cf" duration="10s" />
    </>
  );
}
