import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTime } from "react-timer-hook";
import s from "@/styles/dashboard.module.scss";

const roomCoords = {
  lat: 47.2049529,
  lng: 38.9403871,
};

export default function DashboardSidebar() {
  const [coords, setCoords] = useState(roomCoords);
  const [weather, setWeather] = useState();
  const { minutes, hours, ampm } = useTime({ format: "12-hour" });

  const getWeather = async () => {
    try {
      const { data } = await axios.get(
        `https://fcc-weather-api.glitch.me/api/current?lat=${coords.lat}&lon=${coords.lng}`
      );
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

  return (
    <div className={s.side}>
      <div className={s.live}>
        <p>
          <span></span>Live
        </p>
        Unavailable
      </div>
      <div className={s.section}>
        <h4>At home now</h4>
        <div className={s.members}>
          <div className={s.member}>
            <div>
              <img src="https://sun9-12.userapi.com/impg/GsAZ5dhs2j6YcGOCP5idXTn9-zBOvDIzHxBLPA/gdzNndAk4tQ.jpg?size=400x400&quality=96&sign=e127a19f74ed3bc3474edd53048d5356&type=album" />
            </div>
            <span>jake</span>
          </div>
          <div className={s.member}>
            <div>
              <img src="https://sun9-25.userapi.com/impg/kQeh1p9Hj-EUGGS9Sxrx1AgfafY_gwd_AxXHng/w90B13F2apw.jpg?size=400x400&quality=96&sign=31e52102636afb03c9d6cea6c214ca50&type=album" />
            </div>
            <span>jake</span>
          </div>
          <div className={s.member}>
            <div>
              <img src="https://sun9-37.userapi.com/impg/sp3p4-PMhxlFSqw2Yp7_syhTtxYGBZ83YwBWmQ/WZAe0RXQDsE.jpg?size=400x400&quality=96&sign=47000ca813af512503ea1097c003e645&type=album" />
            </div>
            <span>jake</span>
          </div>
          <div className={s.member}>
            <div>
              <img src="https://sun9-42.userapi.com/impg/bKZWrGrVfFB0AEkvaUCngOKIl3RYYUSOHKtOhw/Fs8YhfGFy4I.jpg?size=400x400&quality=96&sign=627724de2827261c4abbf52a37222a00&type=album" />
            </div>
            <span>jake</span>
          </div>
        </div>
      </div>
      <div className={s.section + " " + s.weather}>
        <h4>Weather</h4>
        <div>
          {!!weather && (
            <>
              <header>
                <h5>{weather.name}</h5>
                <span>
                  {hours}:{minutes > 9 ? minutes : "0" + minutes}
                  {ampm}
                </span>
              </header>
              <main>
                {weather.weather[0].main.toLowerCase() === "clouds" && (
                  <ion-icon name="cloudy"></ion-icon>
                )}
                {weather.weather[0].main.toLowerCase() === "rain" && (
                  <ion-icon name="rainy"></ion-icon>
                )}
                <div>
                  <h5>{weather.weather[0].main}</h5>
                  <h6>{weather.weather[0].description}</h6>
                </div>
              </main>
              <section>
                <ion-icon name="thermometer"></ion-icon>
                {weather.main.temp}°C
                <span>({weather.main.feels_like}°C)</span>
              </section>
              <section>
                <ion-icon name="water-outline"></ion-icon>
                {weather.main.humidity}%
              </section>
              <section>
                <ion-icon
                  name="arrow-up-outline"
                  style={{ transform: `rotate(${weather.wind.deg}deg)` }}
                ></ion-icon>
                {weather.wind.speed} m/s
                <span>
                  {
                    [
                      "north",
                      "northeast",
                      "east",
                      "southeast",
                      "south",
                      "southwest",
                      "west",
                      "northwest",
                    ][(Math.round((weather.wind.deg * 8) / 360, 0) + 8) % 8]
                  }
                </span>
              </section>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
