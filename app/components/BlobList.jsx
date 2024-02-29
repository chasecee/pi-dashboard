"use client";
import React, { useState, useEffect } from "react";

const BlobList = () => {
  const [newestBlob, setNewestBlob] = useState(null);
  const [dominantColor, setDominantColor] = useState("#FFFFFF"); // Default color
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [colorPalette, setColorPalette] = useState({});
  const extractPromptText = (fileName) => {
    console.log("Extracting prompt from fileName:", fileName); // Debugging: Log the fileName input

    if (!fileName) return "Unknown Prompt"; // Return early if fileName is undefined or null

    // This pattern removes the "generated-image-" prefix and the date suffix along with the extension
    const pattern = /^generated-image-(.*?)-\d+\.jpeg$/;
    const match = fileName.match(pattern);
    if (match && match[1]) {
      const prompt = match[1].replace(/_/g, " ");
      console.log("Extracted prompt:", prompt); // Debugging: Log the extracted prompt
      return prompt;
    }
    console.log("No prompt extracted, pattern did not match"); // Debugging: Log if no prompt was extracted
    return "Unknown Prompt"; // Fallback in case the pattern does not match
  };
  useEffect(() => {
    const fetchBlobs = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/list-blobs");
        if (!response.ok) {
          throw new Error("Failed to fetch blobs");
        }
        const data = await response.json();
        if (data.blobs && data.blobs.length > 0) {
          const sortedBlobs = data.blobs.sort(
            (a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt)
          );
          setNewestBlob(sortedBlobs[0]); // Set only the newest blob
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlobs();
  }, []);

  useEffect(() => {
    if (newestBlob) {
      // Fetch the dominant color for the newest blob
      fetch(`/api/get-colors?imageUrl=${encodeURIComponent(newestBlob.url)}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("API response data:", data);
          setColorPalette(data); // Store the entire color palette
        })
        .catch((error) => {
          console.error("Error fetching colors:", error);
        });
    }
  }, [newestBlob]);
  const generateColorStyles = () => {
    return Object.entries(colorPalette)
      .map(([key, value]) => {
        // Round each RGB value to the nearest whole number
        const rgbString = value.rgb.map((num) => Math.round(num)).join(",");
        // Generate both background color and text color classes with rounded RGB values
        return `.bg-${key} { background-color: rgb(${rgbString}); }\n.color-${key} { color: rgb(${rgbString}); }\n`;
      })
      .join("");
  };
  // Function to format the date and time
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  if (isLoading) return <p>Loading blobs...</p>;
  if (error) return <p>Error fetching blobs: {error}</p>;
  if (!newestBlob) return <p>No blobs found.</p>;

  return (
    <div>
      <style>{generateColorStyles()}</style>
      <div
        style={{ backgroundImage: `url(${newestBlob.url})` }}
        className="h-full fixed w-full inset-0 z-[-1] aspect-square bg-cover bg-center"
      >
        <p style={{ color: dominantColor }}>
          Uploaded on:{" "}
          {newestBlob.uploadedAt
            ? formatDate(newestBlob.uploadedAt)
            : "Unknown"}
        </p>
        <p style={{ color: dominantColor }}>
          Prompt: {extractPromptText(newestBlob.pathname)}{" "}
          {/* Updated to use pathname if fileName is not available */}
        </p>
        <div className="flex flex-row w-full fixed top-0 left-0 right-0">
          {Object.keys(colorPalette).map((key) => {
            const color = colorPalette[key];
            // Construct the RGB string for the color
            const rgbString = `rgb(${color.rgb.join(",")})`;
            return (
              <div
                key={key}
                title={key}
                style={{
                  backgroundColor: rgbString,
                }}
                className="w-full flex justify-center items-center"
              >
                <span className="opacity-50">{key}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BlobList;
