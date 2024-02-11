"use client";
import React, { useState, useEffect } from "react";

export default function Quotable() {
  const [data, setData] = useState(null);

  async function fetchQuote() {
    try {
      // Fetch from your app's API route
      const response = await fetch("/api/quotes/");
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      setData(data);
    } catch (error) {
      console.error(error);
      setData({ content: "Oops... Something went wrong" });
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
      <p className="text-pretty">
        {data.content}
        {data.author && (
          <span>
            <cite
              className="opacity-70 ml-5 whitespace-nowrap"
              title="Source Title"
            >
              - {data.author}
            </cite>
          </span>
        )}
      </p>
    </div>
  );
}
