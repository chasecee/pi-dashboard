import { useState, useEffect } from "react";

function formatTime(date) {
  let hours = date.getHours() % 12 || 12;
  let minutes = date.getMinutes();
  minutes = minutes < 10 ? "0" + minutes : minutes;
  return `${hours}:${minutes}`;
}

export default function Clock() {
  const [time, setTime] = useState("00:00");

  useEffect(() => {
    const tick = () => setTime(formatTime(new Date()));
    tick();
    const timerId = setInterval(tick, 1000);
    return () => clearInterval(timerId);
  }, []);

  return (
    <div className="w-full text-center text-[clamp(48px,min(37cqw,60cqh),500px)] leading-none tracking-tight">
      {time}
    </div>
  );
}
