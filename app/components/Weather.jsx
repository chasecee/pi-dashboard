"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import DalleImage from "@/app/components/DalleImage";
const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [weatherSummary, setWeatherSummary] = useState("");
  // Function to fetch weather summary from chat API
  const fetchWeatherSummary = async (weatherData) => {
    try {
      const messages = [
        { role: "system", content: "I am a weather summarizer." },
        {
          role: "user",
          content: `Summarize this weather data, but only mention the current weather: no quotes. don't mention the actual temp. say it in one line, and as if you are david attenbourough. only output what he would say. don't include the location data. One sentence. don't say "the current weather.." or anything like that just say what it is. ${JSON.stringify(
            weatherData
          )}`,
        },
      ];
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages }),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch weather summary");
      }
      // Assuming the API returns a text stream, we need to read the stream
      const reader = response.body.getReader();
      let summary = "";
      reader.read().then(function processText({ done, value }) {
        if (done) {
          setWeatherSummary(summary);
          return;
        }
        // Decode the stream chunks and concatenate
        summary += new TextDecoder("utf-8").decode(value);
        // Read the next chunk
        reader.read().then(processText);
      });
    } catch (error) {
      console.error("Error fetching weather summary:", error);
    }
  };
  // Call fetchWeatherSummary when weatherData is set
  useEffect(() => {
    if (weatherData) {
      fetchWeatherSummary(weatherData);
    }
  }, [weatherData]);
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

    const intervalId = setInterval(fetchWeatherData, 300000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  if (!weatherData) return <div>Loading...</div>;
  return (
    <>
      <div className="flex flex-row justify-between gap-0 ">
        <div className="pr-2 py-0 pl-10 text-center whitespace-nowrap flex-grow">
          <span className="opacity-0 hidden">°</span>
          {weatherData.current?.temp.toFixed(1)}°
        </div>
        <div className="h-[100cq] w-[6px] opacity-50 bg-current"></div>
        <div className="tracking-normal flex flex-row flex-grow items-center justify-center gap-6 px-6 overflow-hidden whitespace-nowrap">
          <div className="icon flex-shrink-0 opacity-70 relative rounded-[20px] overflow-hidden">
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
          </div>
          {/* <p className="text-[4vw] mr-5">
            {weatherData.current?.weather && weatherData.current.weather[0]
              ? weatherData.current.weather[0].description
              : "No weather data available"}
          </p> */}
          <div className="weather-summary text-[2vw] tracking-normal break-words whitespace-normal">
            {weatherSummary || "Loading summary..."}
          </div>
          {/* <DalleImage prompt={weatherSummary} /> */}
        </div>
      </div>
    </>
  );
};

export default Weather;
