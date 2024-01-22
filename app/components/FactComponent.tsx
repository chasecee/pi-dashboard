// app/components/FactComponent.tsx
"use client";
import { useState, useEffect } from "react";

const FactComponent = () => {
  const [advice, setAdvice] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFact = async () => {
      try {
        setLoading(true);
        const timestamp = new Date().getTime(); // Get current timestamp
        const response = await fetch(`/api/randomFact`, {
          next: {
            revalidate: 1, // 1 hour
          },
        }); // Append timestamp to URL
        const data = await response.json();
        setAdvice(data.slip.advice);
        setError("");
      } catch (error) {
        setError("Failed to load advice");
      } finally {
        setLoading(false);
      }
    };

    fetchFact();
    const intervalId = setInterval(fetchFact, 30 * 60 * 1000); // 30 minutes in milliseconds
    return () => clearInterval(intervalId);
  }, []);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="flex flex-row items-center gap-3 ">
      <p className="opacity-70 leading-[100%]">TIP:</p>
      <p className="text-left leading-[100%]">{advice}</p>
    </div>
  );
};

export default FactComponent;
