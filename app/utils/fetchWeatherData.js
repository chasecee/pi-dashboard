const fetchWeatherData = async (setWeatherData) => {
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

export default fetchWeatherData;
