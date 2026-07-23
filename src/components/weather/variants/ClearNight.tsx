import Moon from "../primitives/Moon";
import Stars from "../primitives/Stars";
import { NIGHT_MASK } from "../types";

export default function ClearNight() {
  return (
    <>
      <Moon
        cx={322}
        cy={88}
        r={36}
        maskCx={304}
        maskCy={72}
        maskR={30}
        maskColor={NIGHT_MASK}
      />
      <Stars
        stars={[
          { cx: 0, cy: 60, r: 3.5, duration: "4.8s" },
          { cx: 34, cy: 120, r: 2.5, duration: "6.2s", delay: "1s" },
          { cx: 58, cy: 40, r: 2.5, duration: "5.6s", delay: "2.2s" },
          { cx: 16, cy: 158, r: 2, duration: "6.8s", delay: "3.2s" },
          { cx: 26, cy: 86, r: 2, duration: "5.2s", delay: "1.8s" },
        ]}
      />
    </>
  );
}
