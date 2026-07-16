import { useState, useEffect } from "react";

const STORAGE_KEY = "quotable_data";
const STORAGE_TIMESTAMP_KEY = "quotable_timestamp";
const QUOTE_TTL_MS = 12 * 60 * 60 * 1000;
const CHECK_MS = 60 * 60 * 1000;
const SCALE_AT = 81;

function quoteScale(length) {
  if (length <= SCALE_AT) return 1;
  return Math.max(0.72, SCALE_AT / length);
}

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
    return {
      q: "If you're not making mistakes, then you're not doing anything.",
      a: "John Wooden",
    };
  }
}

function shouldFetchNewQuote() {
  const timestamp = localStorage.getItem(STORAGE_TIMESTAMP_KEY);
  if (!timestamp) return true;

  const lastFetch = parseInt(timestamp, 10);
  return Date.now() - lastFetch >= QUOTE_TTL_MS;
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
  const [data, setData] = useState(() =>
    typeof window === "undefined" ? null : getStoredQuote(),
  );

  useEffect(() => {
    const updateQuote = async () => {
      const quote = await fetchQuote();
      storeQuote(quote);
      setData(quote);
    };

    updateQuote();

    const checkInterval = setInterval(() => {
      if (shouldFetchNewQuote()) {
        updateQuote();
      }
    }, CHECK_MS);

    return () => clearInterval(checkInterval);
  }, []);

  if (!data) {
    return null;
  }

  return (
    <div>
      <p className="text-balance mx-[4cqw]" style={{ fontSize: `${quoteScale(data.q.length)}em` }}>
        {data.q}
        {data.a && (
          <span>
            <span
              className="opacity-70 ml-[4cqw] mt-[1.5cqh] tracking-[0.2cqw] font-normal uppercase text-[.5em] block whitespace-nowrap"
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
