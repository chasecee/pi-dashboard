//app/components/FactComponent.tsx
"use client";
import { useState, useEffect } from "react";

const FactComponent = () => {
  const [advice, setAdvice] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFact = async () => {
      try {
        setLoading(true); // Set loading to true before fetching new advice
        const response = await fetch("/api/randomFact");
        const data = await response.json();
        setAdvice(data.slip.advice);
        setError(""); // Clear any previous errors
      } catch (error) {
        setError("Failed to load advice");
      } finally {
        setLoading(false); // Ensure loading is set to false after fetching
      }
    };

    // Call fetchFact when the component mounts
    fetchFact();

    // Set up an interval to fetch fact every 30 minutes
    const intervalId = setInterval(fetchFact, 30 * 60 * 1000); // 30 minutes in milliseconds

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  // Loading and error handling
  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  // Fact display
  return (
    <div className="flex flex-row items-center gap-3 ">
      <p className="opacity-70 leading-[100%]">TIP:</p>
      <p className="text-left leading-[100%]">{advice}</p>
    </div>
  );
};

export default FactComponent;
