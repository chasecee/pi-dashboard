"use client";
import { useState, useEffect } from "react";

export default function Clock() {
  const [time, setTime] = useState(null);

  const formatTime = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return `${hours}:${minutes} ${ampm}`;
  };

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(formatTime(new Date()));
    }, 1000);
    return () => clearInterval(timerId);
  }, []);

  return (
    <div className="w-full text-center text-[21vw] leading-[130%] tracking-tight">
      {time || "00:00 PM"}
    </div>
  );
}
