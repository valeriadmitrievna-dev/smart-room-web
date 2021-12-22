import React from "react";
import s from "@/styles/dashboard.module.scss";
import { format } from "date-fns";

export default function DashboardLayout({ weather, time }) {
  return (
    <div className={s.dashboard}>
      <div>ff</div>
      <div className={s.side}>
        <div className={s.live}>
          <p>
            <span></span>Live
          </p>
          Unavailable
        </div>
        <div className={s.section}>
          <h4>At home how</h4>
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
          {!!weather && (
            <>
              <h4>Weather</h4>
              <div>
                <header>
                  <h5>{weather.name}</h5>
                  <span>
                    {time.hours}:
                    {time.minutes > 9 ? time.minutes : "0" + time.minutes}
                    {time.ampm}
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
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
