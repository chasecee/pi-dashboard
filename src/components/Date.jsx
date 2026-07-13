import { useState, useEffect } from "react";

function formatDate(date) {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function DateDisplay() {
  const [dateString, setDateString] = useState("_");

  useEffect(() => {
    const tick = () => setDateString(formatDate(new Date()));
    tick();
    const timerId = setInterval(tick, 60_000);
    return () => clearInterval(timerId);
  }, []);

  return <div className="w-full">{dateString}</div>;
}
