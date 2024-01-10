"use client";
import React, { useEffect, useState } from "react";

const HomeAssistantLogbook = () => {
  const [logbookEntries, setLogbookEntries] = useState([]);
  // Initialize lastUpdateTime to 1 hour in the past
  const [lastUpdateTime, setLastUpdateTime] = useState(
    () => new Date(Date.now() - 3600 * 1000).toISOString() // 1 hour in the past
  );

  useEffect(() => {
    const fetchLogbook = async () => {
      // Fetch entries from the last hour
      const url = `/api/logbook?end_time=${encodeURIComponent(lastUpdateTime)}`;
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        setLogbookEntries(() => {
          // Sort and slice the data to keep only the 5 most recent entries
          const recentEntries = data
            .sort((a, b) => new Date(b.when) - new Date(a.when))
            .slice(0, 15); // Keep only the top 5 entries
          return recentEntries;
        });
        // Update the lastUpdateTime to the timestamp of the latest entry
        if (data.length > 0) {
          setLastUpdateTime(data[0].when);
        }
      } else {
        console.error("Failed to fetch logbook:", response.statusText);
      }
    };

    // Set up the interval for fetching new data
    const interval = setInterval(fetchLogbook, 2000); // Fetch every 2 seconds
    return () => clearInterval(interval);
  }, [lastUpdateTime]);

  return (
    <div className="logbook">
      {logbookEntries.length > 0 ? (
        <ul>
          {logbookEntries.map((entry, index) => (
            <li
              key={`${entry.entity_id}-${entry.when}-${index}`}
              className="logbook-entry"
            >
              <div className="logbook-entry-header flex flex-row justify-between flex-nowrap">
                <span className="logbook-entry-name max-w-1/2 overflow-hidden block">
                  {entry.name}
                </span>
                <span className="logbook-entry-time">
                  {new Date(entry.when).toLocaleTimeString()}
                </span>
              </div>
              <div className="logbook-entry-message">{entry.message}</div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No logbook entries found.</p>
      )}
    </div>
  );
};

export default HomeAssistantLogbook;
