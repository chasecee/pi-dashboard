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
    const intervalId = setInterval(fetchQuote, 3600000); // Set up an interval to fetch a quote every hour (3600000 milliseconds)

    return () => clearInterval(intervalId); // Clear the interval when the component unmounts
  }, []);

  if (!data) return null; // Do not render until the first quote is loaded

  return (
    <div>
      <p className="text-balance">
        {data.q}
        {data.a && (
          <span>
            <cite
              className="opacity-70 ml-5 mt-5 font-normal block whitespace-nowrap"
              title="Source Title"
            >
              {data.a}
            </cite>
          </span>
        )}
      </p>
    </div>
  );
}
