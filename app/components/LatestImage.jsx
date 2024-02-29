import { useEffect, useState } from "react";

const LatestImage = () => {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    // Fetch the latest image URL from your API or storage
    // This is a placeholder URL - replace with your actual API endpoint or logic to retrieve the latest image URL
    const fetchLatestImageUrl = async () => {
      const response = await fetch("/api/latest-image");
      if (response.ok) {
        const data = await response.json();
        setImageUrl(data.imageUrl);
      } else {
        console.error("Failed to fetch latest image URL");
      }
    };

    fetchLatestImageUrl();
  }, []);

  return imageUrl ? (
    <img src={imageUrl} alt="Latest Generated" />
  ) : (
    <p>Loading latest image...</p>
  );
};

export default LatestImage;
