import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTime } from "react-timer-hook";
import DashboardLayout from "./index.layout";

const roomCoords = {
  lat: 47.2049529,
  lng: 38.9403871,
};

export default function Dashboard() {
  const [coords, setCoords] = useState(roomCoords);
  const [weather, setWeather] = useState();
  const { minutes, hours, ampm } = useTime({ format: "12-hour" });

  const getWeather = async () => {
    try {
      const { data } = await axios.get(
        `https://fcc-weather-api.glitch.me/api/current?lat=${coords.lat}&lon=${coords.lng}`
      );
      console.log(data);
      setWeather(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  //   get weather
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        setCoords({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    } else {
      console.log("Not Available");
    }
    getWeather();
  }, []);

  return <DashboardLayout weather={weather} time={{ minutes, hours, ampm }} />;
}
