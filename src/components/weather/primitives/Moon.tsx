type MoonProps = {
  cx: number;
  cy: number;
  r: number;
  maskCx: number;
  maskCy: number;
  maskR: number;
  maskColor: string;
};

export default function Moon({
  cx,
  cy,
  r,
  maskCx,
  maskCy,
  maskR,
  maskColor,
}: MoonProps) {
  return (
    <>
      <circle cx={cx} cy={cy} r={r} fill="#cfd8e3" />
      <circle cx={maskCx} cy={maskCy} r={maskR} fill={maskColor} />
    </>
  );
}
