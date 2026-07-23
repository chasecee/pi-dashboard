type Star = {
  cx: number;
  cy: number;
  r: number;
  duration: string;
  delay?: string;
};

type StarsProps = {
  stars: Star[];
};

export default function Stars({ stars }: StarsProps) {
  return (
    <>
      {stars.map((star, i) => (
        <circle
          key={i}
          cx={star.cx}
          cy={star.cy}
          r={star.r}
          fill="#b48cf5"
          style={{
            animation: `weather-twinkle ${star.duration} ease-in-out ${star.delay ?? "0s"} infinite`,
          }}
        />
      ))}
    </>
  );
}
