// app/image-generator/page.js
"use client";
import React, { useState } from "react";

const ImageGeneratorPage = () => {
  const [imageData, setImageData] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Added loading state

  const handleGenerateImage = async () => {
    try {
      setIsLoading(true); // Set loading to true when the request starts
      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: "a white siamese cat" }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setImageData(data[0]);
    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      setIsLoading(false); // Reset loading state whether request succeeds or fails
    }
  };

  return (
    <div>
      <button onClick={handleGenerateImage} disabled={isLoading}>
        {isLoading ? "Generating..." : "Generate Image"}{" "}
        {/* Update button text based on loading state */}
      </button>
      {imageData && <img src={imageData.url} alt="Generated" />}
    </div>
  );
};

export default ImageGeneratorPage;
