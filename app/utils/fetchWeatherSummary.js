const fetchWeatherSummary = async (weatherData, setWeatherSummary) => {
  try {
    const messages = [
      { role: "system", content: "I am a weather summarizer." },
      {
        role: "user",
        content: `Summarize this weather data, but only mention the current weather: no quotes. don't mention the actual temp. say it in one line, and as if you are david attenbourough. only output what he would say. don't include the location data. One sentence. don't say "the current weather.." or anything like that just say what it is. Also, it's important to note that the location is a high desert, please include that as a part of the analysis ${JSON.stringify(
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
    const reader = response.body.getReader();
    let summary = "";
    reader.read().then(function processText({ done, value }) {
      if (done) {
        setWeatherSummary(summary);
        return;
      }
      summary += new TextDecoder("utf-8").decode(value);
      reader.read().then(processText);
    });
  } catch (error) {
    console.error("Error fetching weather summary:", error);
  }
};

export default fetchWeatherSummary;
