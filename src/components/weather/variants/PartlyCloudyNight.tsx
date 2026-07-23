import Cloud from "../primitives/Cloud";
import Moon from "../primitives/Moon";
import Stars from "../primitives/Stars";
import { NIGHT_MASK } from "../types";

export default function PartlyCloudyNight() {
  return (
    <>
      <Moon
        cx={0}
        cy={58}
        r={28}
        maskCx={16}
        maskCy={46}
        maskR={24}
        maskColor={NIGHT_MASK}
      />
      <Stars
        stars={[
          { cx: 52, cy: 130, r: 2.5, duration: "5.8s" },
          { cx: 24, cy: 160, r: 2, duration: "6.6s", delay: "2s" },
        ]}
      />
      <Cloud x={250} y={92} scale={1.25} fill="#b48cf5" duration="10s" />
    </>
  );
}
