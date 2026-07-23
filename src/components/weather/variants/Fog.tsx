import FogBands from "../primitives/FogBands";

export default function Fog() {
  return (
    <FogBands
      bands={[
        { x1: -30, y1: 56, x2: 96, y2: 56, opacity: 0.55, duration: "16s" },
        {
          x1: -30,
          y1: 88,
          x2: 70,
          y2: 88,
          opacity: 0.35,
          duration: "20s",
          reverse: true,
        },
        {
          x1: -30,
          y1: 120,
          x2: 86,
          y2: 120,
          opacity: 0.5,
          duration: "18s",
          delay: "2s",
        },
        {
          x1: 232,
          y1: 70,
          x2: 350,
          y2: 70,
          opacity: 0.45,
          duration: "18s",
          reverse: true,
          delay: "1s",
        },
        {
          x1: 256,
          y1: 102,
          x2: 350,
          y2: 102,
          opacity: 0.3,
          duration: "22s",
        },
        {
          x1: 240,
          y1: 134,
          x2: 350,
          y2: 134,
          opacity: 0.5,
          duration: "16s",
          reverse: true,
          delay: "3s",
        },
      ]}
    />
  );
}
