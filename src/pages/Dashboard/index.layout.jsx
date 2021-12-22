import React from "react";
import s from "@/styles/dashboard.module.scss";
import DashboardSidebar from "@/components/DashboardSidebar";
import { useTime } from "react-timer-hook";
import emoji from "react-easy-emoji";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const greeting = (hours, name) => {
  if (hours >= 5 && hours <= 10)
    return (
      <h1>
        Good morning, {name} {emoji("🌅")}
      </h1>
    );
  if (hours >= 11 && hours <= 17)
    return (
      <h1>
        Hello, {name} {emoji("☀️")}
      </h1>
    );
  if (hours >= 18 && hours <= 23)
    return (
      <h1>
        Good evening, {name} {emoji("🌇")}
      </h1>
    );
  if (hours >= 0 && hours <= 4)
    return (
      <h1>
        Good night, {name} {emoji("🌃")}
      </h1>
    );
};

const data = {
  temperature: {
    prefix: "°C",
    data: [
      {
        date: "07:51",
        value: 1,
      },
      {
        date: "07:52",
        value: 6,
      },
      {
        date: "07:53",
        value: 2,
      },
      {
        date: "07:54",
        value: 4,
      },
      {
        date: "07:55",
        value: 3,
      },
      {
        date: "07:56",
        value: -1,
      },
      {
        date: "07:57",
        value: 2,
      },
    ],
  },
  humidity: {
    prefix: "%",
    data: [
      {
        date: "07:51",
        value: 23,
      },
      {
        date: "07:52",
        value: 25,
      },
      {
        date: "07:53",
        value: 34,
      },
      {
        date: "07:54",
        value: 17,
      },
      {
        date: "07:55",
        value: 47,
      },
      {
        date: "07:56",
        value: 49,
      },
      {
        date: "07:57",
        value: 34,
      },
      {
        date: "07:58",
        value: 32,
      },
      {
        date: "07:59",
        value: 30,
      },
    ],
  },
  illumination: {
    prefix: " lux",
    data: [
      {
        date: "07:51",
        value: 176,
      },
      {
        date: "07:52",
        value: 204,
      },
      {
        date: "07:53",
        value: 258,
      },
      {
        date: "07:54",
        value: 306,
      },
      {
        date: "07:55",
        value: 221,
      },
      {
        date: "07:56",
        value: 242,
      },
      {
        date: "07:57",
        value: 253,
      },
    ],
  },
  hydrocarbons: {
    prefix: " ppm",
    data: [
      {
        date: "07:51",
        value: 111,
      },
      {
        date: "07:52",
        value: 110,
      },
      {
        date: "07:53",
        value: 106,
      },
      {
        date: "07:54",
        value: 96,
      },
      {
        date: "07:55",
        value: 91,
      },
      {
        date: "07:56",
        value: 84,
      },
      {
        date: "07:57",
        value: 84,
      },
    ],
  },
};

const CustomTooltip = ({ active, payload, prefix }) => {
  if (active && payload && payload.length) {
    return (
      <div className={s.tooltip}>
        <span>{payload[0].payload.date}</span>
        <p>
          {payload[0].value}
          {prefix}
        </p>
      </div>
    );
  }
  return null;
};

export default function DashboardLayout() {
  const { hours } = useTime({ format: "12-hour" });
  return (
    <div className={s.dashboard}>
      <div className={s.content}>
        <header>
          {greeting(hours, "Lera")}
          <p>Have a nice day!</p>
        </header>
        <main>
          {Object.entries(data).map(([type, info], id) => (
            <div key={id}>
              <p>{type}</p>
              <ResponsiveContainer height={200}>
                <LineChart data={info.data}>
                  <Tooltip
                    cursor={{ stroke: "rgba(0,0,0,0.25)", strokeWidth: 2 }}
                    content={<CustomTooltip prefix={info.prefix} />}
                  />
                  <CartesianGrid
                    stroke="rgba(0,0,0,0.25)"
                    strokeDasharray="4"
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#000"
                    strokeWidth={2}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ))}
        </main>
      </div>
      <DashboardSidebar />
    </div>
  );
}
