// File: app/components/DalleImage.jsx
"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
const DalleImage = ({ prompt }) => {
  const [imageData, setImageData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDalleImage = async (prompt) => {
    setLoading(true);
    try {
      const response = await fetch("/api/image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to generate image");
      }

      const data = await response.json();
      setImageData(data);
    } catch (error) {
      console.error("Error generating image with DALL-E:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch image when the prompt changes
  useEffect(() => {
    if (prompt) {
      fetchDalleImage(prompt);
    }
  }, [prompt]);

  if (loading) return <div>Loading image...</div>;

  return (
    <div>
      {imageData && (
        <img src={imageData.data[0].url} alt="Generated from DALL-E" />
      )}
    </div>
  );
};

export default DalleImage;
