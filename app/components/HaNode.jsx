"use client";
import React, { useEffect, useState } from "react";
const HomeAssistant = require("homeassistant");

export default function HaNode() {
  const [states, setStates] = useState(null);

  useEffect(() => {
    const hass = new HomeAssistant({
      host: process.env.HOME_ASSISTANT_API_URL,
      token: process.env.HOME_ASSISTANT_API_TOKEN,
    });

    hass.states
      .list()
      .then((states) => {
        setStates(states);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  if (!states) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {states.map((state, index) => (
        <div key={index}>{state}</div>
      ))}
    </div>
  );
}
