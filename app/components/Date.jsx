"use client";
import { useState, useEffect } from "react";

export default function Clock() {
  const [dateString, setDateString] = useState("");

  const formatDate = (date) => {
    // Format the date here, for example: "January 01, 2024"
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  useEffect(() => {
    const timerId = setInterval(() => {
      setDateString(formatDate(new Date()));
    }, 1000); // Update every second, you might want to increase this interval
    return () => clearInterval(timerId);
  }, []);

  return <div className="w-full">{dateString || "_"}</div>;
}
