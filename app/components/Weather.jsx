//app/components/Weather.jsx
"use client";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import DalleImage from "@/app/components/DalleImage";
import fetchWeatherData from "../utils/fetchWeatherData";
import fetchWeatherSummary from "../utils/fetchWeatherSummary";
import generateWeatherImage from "../utils/generateWeatherImage";

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
    if (weatherSummary) {
      generateWeatherImage(weatherSummary, setImageData);
    }
  }, [weatherSummary]);
  if (!weatherData) return <div>Loading...</div>;

  return (
    <>
      <div className="relative flex flex-row justify-between gap-0 items-center">
        <div className="p-2 py-0  text-center whitespace-nowrap absolute top-0 left-2 text-[3vw] tracking-[.5vw]  z-10">
          <span className="opacity-0 hidden">°</span>
          {weatherData.current?.temp.toFixed(0)}°
        </div>
        <div className="h-[100cq] w-[6px] opacity-50 bg-current"></div>
        <div className=" overflow-hidden tracking-normal flex flex-row flex-grow items-center justify-center gap-6 px-6  whitespace-nowrap">
          <div className="absolute inset-0 rounded-xl overflow-hidden">
            {imageData && (
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${imageData.url})` }}
                alt="Weather Image"
              ></div>
            )}
          </div>
          {/* <div className="icon flex-shrink-0 opacity-70 relative rounded-[20px] overflow-hidden">
            <div className="absolute inset-0 bg-current mix-blend-hue z-20"></div>
            {weatherData.current?.weather && weatherData.current.weather[0] && (
              <Image
                src={`https://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`}
                alt="Weather icon"
                width={100}
                height={100}
                className="relative z-10 weather-icon"
              />
            )}
            <div className="absolute inset-0 z-0  bg-black mix-blend-multiply"></div>
          </div> */}
          <div className="relative weather-summary m-10 text-[2vw] tracking-normal break-words whitespace-normal flex flex-row items-center justify-center">
            <div className="bg-black/70 p-3 pl-4 pr-7  rounded-xl text-balance w-[70%] flex-grow">
              {weatherSummary || "Loading summary..."}
            </div>
            <div className="quote-icon relative -ml-5 ring-4 ring-black block rounded-full leading-[0%] overflow-hidden aspect-square">
              <Image
                src="/img/da.jpg"
                alt="Weather icon"
                width={80}
                height={80}
                className="relative"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Weather;
