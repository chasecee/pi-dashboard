type LightningProps = {
  points: string;
  duration?: string;
};

export default function Lightning({
  points,
  duration = "5.2s",
}: LightningProps) {
  return (
    <polygon
      points={points}
      fill="#e8c877"
      style={{
        animation: `weather-flash ${duration} ease-in-out infinite`,
      }}
    />
  );
}
