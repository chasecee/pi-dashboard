import Cloud from "../primitives/Cloud";

export default function Cloudy() {
  return (
    <>
      <Cloud
        x={-24}
        y={28}
        scale={1.05}
        fill="#8ac4cf"
        opacity={0.35}
        animation="fogdrift"
        duration="16s"
      />
      <Cloud x={-48} y={90} scale={1.45} fill="#8ac4cf" />
      <Cloud x={248} y={70} scale={1.3} fill="#8ac4cf" delay="3s" />
    </>
  );
}
