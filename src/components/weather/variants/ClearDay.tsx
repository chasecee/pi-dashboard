import Sun from "../primitives/Sun";

export default function ClearDay() {
  return (
    <>
      <Sun
        cx={0}
        cy={90}
        r={34}
        spin
        rays={[
          { x1: 46, y1: 90, x2: 60, y2: 90 },
          { x1: 32.5, y1: 122.5, x2: 42.4, y2: 132.4 },
          { x1: 0, y1: 136, x2: 0, y2: 150 },
          { x1: -32.5, y1: 122.5, x2: -42.4, y2: 132.4 },
          { x1: -46, y1: 90, x2: -60, y2: 90 },
          { x1: -32.5, y1: 57.5, x2: -42.4, y2: 47.6 },
          { x1: 0, y1: 44, x2: 0, y2: 30 },
          { x1: 32.5, y1: 57.5, x2: 42.4, y2: 47.6 },
        ]}
      />
      <circle cx={320} cy={56} r={16} fill="#e8c877" opacity={0.85} />
      <circle cx={308} cy={126} r={3} fill="#e8c877" opacity={0.6} />
    </>
  );
}
