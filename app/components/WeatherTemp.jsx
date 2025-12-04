"use client";
import React, { useState, useEffect } from "react";
import fetchWeatherData from "../utils/fetchWeatherData";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    fetchWeatherData(setWeatherData);
    const intervalId = setInterval(
      () => fetchWeatherData(setWeatherData),
      30000000
    );
    return () => clearInterval(intervalId);
  }, []);

  if (!weatherData) return <div>Loading...</div>;

  return (
    <>
      <div className="relative ">
        <div className="px-10 text-center whitespace-nowrap  top-0 left-2 text-[3vw] tracking-[.5vw]  z-10">
          <span className="opacity-0 ">°</span>
          {weatherData.current?.temp.toFixed(0)}°
        </div>
      </div>
    </>
  );
};

export default Weather;
