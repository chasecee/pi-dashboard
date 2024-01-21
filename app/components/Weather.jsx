"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch("/api/weather");
        if (!response.ok) {
          throw new Error("Weather data fetch failed");
        }
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    // Call it once immediately
    fetchWeatherData();

    // Then set it to be called every minute
    const intervalId = setInterval(fetchWeatherData, 120000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  if (!weatherData) return <div>Loading...</div>;
  return (
    <div className="flex flex-row justify-between gap-0 divide-blue-900 divide-x-[6px]">
      <div className="pr-2 py-0 pl-10 text-center whitespace-nowrap min-w-[40% tracking-wider]">
        <span className="opacity-0 hidden">°</span>
        {weatherData.current?.temp.toFixed(1)}°
      </div>
      <div className="tracking-normal flex flex-row flex-grow items-center justify-center gap-6 px-6 overflow-hidden whitespace-nowrap">
        <div className="icon flex-shrink-0 opacity-70 relative rounded-[20px] overflow-hidden">
          <div className="absolute inset-0 bg-blue-900 mix-blend-hue z-20"></div>
          {weatherData.current?.weather && weatherData.current.weather[0] && (
            <Image
              src={`https://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`}
              alt="Weather icon"
              width={100}
              height={100}
              className="relative z-10"
            />
          )}
          <div className="absolute inset-0 z-0  bg-black mix-blend-multiply"></div>
        </div>
        <p className="text-[4vw] mr-5">
          {weatherData.current?.weather && weatherData.current.weather[0]
            ? weatherData.current.weather[0].description
            : "No weather data available"}
        </p>
      </div>
    </div>
  );
};

export default Weather;
