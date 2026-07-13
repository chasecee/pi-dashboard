import { useState, useEffect } from "react";

export default function DateDisplay() {
  const [dateString, setDateString] = useState("");

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  useEffect(() => {
    const timerId = setInterval(() => {
      setDateString(formatDate(new Date()));
    }, 1000);
    return () => clearInterval(timerId);
  }, []);

  return <div className="w-full">{dateString || "_"}</div>;
}
