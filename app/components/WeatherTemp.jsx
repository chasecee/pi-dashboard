//app/components/Weather.jsx
"use client";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import DalleImage from "@/app/components/DalleImage";
import fetchWeatherData from "../utils/fetchWeatherData";
import fetchWeatherSummary from "../utils/fetchWeatherSummary";
// import generateWeatherImage from "../utils/generateWeatherImage";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [weatherSummary, setWeatherSummary] = useState("");
  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    fetchWeatherData(setWeatherData);
    const intervalId = setInterval(
      () => fetchWeatherData(setWeatherData),
      30000000
    );
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (weatherData) {
      fetchWeatherSummary(weatherData, setWeatherSummary);
    }
  }, [weatherData]);

  useEffect(() => {
    // if (weatherSummary) {
    //   generateWeatherImage(weatherSummary, setImageData);
    // }
  }, [weatherSummary]);
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
