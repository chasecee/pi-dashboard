import WindGusts from "../primitives/WindGusts";

export default function Wind() {
  return (
    <WindGusts
      gusts={[
        {
          x1: -20,
          y1: 60,
          x2: 104,
          y2: 60,
          dasharray: "42 22",
          duration: "4.4s",
        },
        {
          x1: -20,
          y1: 90,
          x2: 88,
          y2: 90,
          dasharray: "30 34",
          opacity: 0.7,
          duration: "3.4s",
        },
        {
          x1: -20,
          y1: 120,
          x2: 98,
          y2: 120,
          dasharray: "52 24",
          opacity: 0.45,
          duration: "5.6s",
        },
        {
          x1: 222,
          y1: 74,
          x2: 340,
          y2: 74,
          dasharray: "36 26",
          opacity: 0.6,
          duration: "4.8s",
        },
        {
          x1: 236,
          y1: 104,
          x2: 340,
          y2: 104,
          dasharray: "48 22",
          opacity: 0.4,
          duration: "3.8s",
        },
      ]}
    />
  );
}
