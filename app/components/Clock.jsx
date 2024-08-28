"use client";
import { useState, useEffect } from "react";

export default function Clock() {
  const [time, setTime] = useState(null);

  const formatTime = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();

    hours = hours % 12;
    hours = hours || 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;

    return `${hours}:${minutes}`;
  };

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(formatTime(new Date()));
    }, 1000);
    return () => clearInterval(timerId);
  }, []);

  return (
    <div className="w-full text-center text-[clamp(200px,35vw,500px)] leading-[70%] tracking-tight">
      {time || "00:00"}
    </div>
  );
}
