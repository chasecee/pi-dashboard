"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeatherData = () => {
      fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=40.738051&lon=-111.823610&exclude=hourly,daily&units=imperial&appid=bf1091302b17461664744d38b5328516`
      )
        .then((response) => response.json())
        .then((data) => setWeatherData(data));
    };

    // Call it once immediately
    fetchWeatherData();

    // Then set it to be called every minute
    const intervalId = setInterval(fetchWeatherData, 60000); // 60000 ms = 1 minute

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  if (!weatherData) return <div>Loading...</div>;
  return (
    <div className="flex flex-row justify-between gap-0  divide-green-900 divide-x-[6px] ">
      <div className="pr-2 py-4 pl-10 text-center whitespace-nowrap min-w-[40%]">
        <span className="opacity-0 hidden">°</span>
        {weatherData.current.temp.toFixed(1)}°
      </div>
      <div className="tracking-normal flex flex-row flex-grow items-center justify-center gap-6 px-6 overflow-hidden whitespace-nowrap">
        <div className="icon flex-shrink-0 opacity-70">
          {weatherData.current.weather && weatherData.current.weather[0] && (
            <Image
              src={`https://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`}
              alt="Weather icon"
              width={100}
              height={100}
            />
          )}
        </div>

        <p className="text-[4vw]">
          {weatherData.current.weather && weatherData.current.weather[0]
            ? weatherData.current.weather[0].description
            : "No weather data available"}
        </p>
      </div>
    </div>
  );
};

export default Weather;
