import { useState, useEffect } from "react";

const STORAGE_KEY = "quotable_data";
const STORAGE_TIMESTAMP_KEY = "quotable_timestamp";
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

async function fetchQuote() {
  try {
    const response = await fetch("/api/quotes");
    if (!response.ok) {
      throw new Error("Failed to fetch quote");
    }
    const [quote] = await response.json();
    return quote;
  } catch (error) {
    console.error(error);
    return { q: "Oops... Something went wrong" };
  }
}

function shouldFetchNewQuote() {
  const timestamp = localStorage.getItem(STORAGE_TIMESTAMP_KEY);
  if (!timestamp) return true;

  const lastFetch = parseInt(timestamp, 10);
  return Date.now() - lastFetch >= ONE_DAY_MS;
}

function getStoredQuote() {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : null;
}

function storeQuote(quote) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(quote));
  localStorage.setItem(STORAGE_TIMESTAMP_KEY, Date.now().toString());
}

export default function Quotable() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const updateQuote = async () => {
      if (shouldFetchNewQuote()) {
        const quote = await fetchQuote();
        storeQuote(quote);
        setData(quote);
      } else {
        const stored = getStoredQuote();
        if (stored) {
          setData(stored);
        }
      }
    };

    updateQuote();

    const checkInterval = setInterval(() => {
      if (shouldFetchNewQuote()) {
        updateQuote();
      }
    }, 60 * 60 * 1000);

    return () => clearInterval(checkInterval);
  }, []);

  if (!data) {
    return null;
  }

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
