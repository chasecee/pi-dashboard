"use client";
import React, { useState, useEffect } from "react";

export default function Quotable() {
  const [data, setData] = useState(null);

  async function fetchQuote() {
    try {
      // Fetch from your app's API route
      const response = await fetch("/api/quotes/");
      const [quote] = await response.json(); // Destructure the first element from the array
      console.log(quote);
      if (!response.ok) throw new Error(quote.message);
      setData(quote);
    } catch (error) {
      console.error(error);
      setData({ q: "Oops... Something went wrong" });
    }
  }

  useEffect(() => {
    fetchQuote(); // Fetch a quote when the component mounts
    const hoursToMilliseconds = (hours) => hours * 3600000;
    const intervalInHours = 0.5; // Change this value to set the desired interval in hours
    const intervalId = setInterval(
      fetchQuote,
      hoursToMilliseconds(intervalInHours)
    );

    return () => clearInterval(intervalId); // Clear the interval when the component unmounts
  }, []);

  if (!data) return null; // Do not render until the first quote is loaded

  return (
    <div>
      <p className="text-balance mx-[5vw]">
        {data.q}
        {data.a && (
          <span>
            <span
              className="opacity-70 ml-5 mt-5 tracking-[.2vw] font-normal uppercase text-[.5em] block whitespace-nowrap"
              title="Source Title"
            >
              {data.a}
            </span>
          </span>
        )}
      </p>
    </div>
  );
}
