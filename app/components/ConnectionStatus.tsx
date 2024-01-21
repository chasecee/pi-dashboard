"use client";
import React, { useState, useEffect } from "react";

const ConnectionStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const updateStatus = () => {
    setIsOnline(navigator.onLine);
  };

  useEffect(() => {
    window.addEventListener("online", updateStatus);
    window.addEventListener("offline", updateStatus);

    return () => {
      window.removeEventListener("online", updateStatus);
      window.removeEventListener("offline", updateStatus);
    };
  }, []);

  return (
    <div
      className={`flex rounded-l-xl ring-[6px] flex-row items-center text-[2vw] gap-4 px-4 py-2 ring-current ring-opacity-50  uppercase font-normal flex-shrink-0 ${
        isOnline ? "text-green-700" : "text-red-700"
      }`}
    >
      <div
        className="h-4 w-4 rounded-full bg-current"
        title={isOnline ? "Connected to Internet" : "No Internet Connection"}
      ></div>
      <span className="">
        {isOnline ? "Connected to Internet" : "No Internet Connection"}
      </span>
    </div>
  );
};

export default ConnectionStatus;
