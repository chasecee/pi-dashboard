const generateWeatherImage = async (weatherSummary, setImageData) => {
  try {
    const response = await fetch("/api/generate-image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: weatherSummary }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    setImageData(data[0]);
  } catch (error) {
    console.error("Error generating weather image:", error);
  }
};

export default generateWeatherImage;
