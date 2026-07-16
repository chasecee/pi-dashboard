import { useId } from "react";

const LEG_R = [
  "M2.47619,41.4255L7.42857,47.7021L5.15003,52.4208L6.38813,54.9314",
  "M2.47619,41.4255L3.90476,49L4.90476,59L8.90476,55",
];
const LEG_L = [
  "M13.619,41.4255L16.0952,51.4681L17.9524,59L21.0476,55.234",
  "M13.619,41.4255L17.9524,47L13.9524,51L15.9524,54",
];
const HAND_L = [
  "M18.3819,14.5121L15.5702,23.8513L21.3897,28.2831",
  "M18.3819,14.5121L17.1233,23.3751L23.5407,20.4466",
];
const HAND_R = [
  "M3.62259,16.9104L2.75477,26.223L10.3307,24.6273",
  "M3.62259,16.9104L0.675654,23.266L4.71064,26.3834",
];

function Morph({ values, active }) {
  if (!active) return null;
  return (
    <animate
      attributeName="d"
      values={`${values[0]};${values[1]};${values[0]}`}
      keyTimes="0;0.5;1"
      dur="1s"
      calcMode="spline"
      keySplines="0.86 0 0.07 1;0.86 0 0.07 1"
      repeatCount="indefinite"
    />
  );
}

export default function Walker({ className, state = "walk" }) {
  const uid = useId().replace(/:/g, "");
  const walking = state === "walk";

  return (
    <svg
      className={className}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="14 0 36 64"
      fill="none"
    >
      {walking ? (
        <style>{`
          @keyframes walker-bob-${uid} {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(1px); }
          }
          .walker-bob-${uid} {
            animation: walker-bob-${uid} 1s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite;
          }
        `}</style>
      ) : null}
      <g transform="translate(19,2)">
        <g className={walking ? `walker-bob-${uid}` : undefined}>
          <g transform="translate(3.71429,12.487)">
            <g transform="translate(1.1728,-12.48695)">
              <rect
                width="11.78"
                height="31.8999"
                fill="currentColor"
                rx="6"
                transform="translate(2.86764,27.8971) translate(-3,-15.95)"
              />
              <ellipse
                fill="currentColor"
                rx="5.89916"
                ry="5.97359"
                transform="translate(5.96441,5.97359)"
              />
            </g>
          </g>
          <path
            stroke="currentColor"
            strokeWidth="3.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            d={LEG_R[0]}
            transform="translate(7.42857,41.4255) scale(-1,1) translate(-2.47619,-41.4255)"
          >
            <Morph values={LEG_R} active={walking} />
          </path>
          <path
            stroke="currentColor"
            strokeWidth="3.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            d={LEG_L[0]}
          >
            <Morph values={LEG_L} active={walking} />
          </path>
          <path
            stroke="currentColor"
            strokeWidth="3.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            d={HAND_L[0]}
            transform="translate(18.3888,-6.8753) rotate(-41) scale(-1,1)"
          >
            <Morph values={HAND_L} active={walking} />
          </path>
          <path
            stroke="currentColor"
            strokeWidth="3.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            d={HAND_R[0]}
            transform="translate(6.54275,21.5667) rotate(41) translate(-6.54275,-21.5667)"
          >
            <Morph values={HAND_R} active={walking} />
          </path>
        </g>
      </g>
    </svg>
  );
}
