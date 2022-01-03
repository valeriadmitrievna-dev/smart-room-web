import React from "react";
import s from "~/styles/dashboard.module.scss";
import DashboardSidebar from "~/components/DashboardSidebar";
import { useTime } from "react-timer-hook";
import emoji from "react-easy-emoji";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import CustomTooltip from '~/components/CustomTooltip'

const greeting = (hours, ampm, name) => {
  if (ampm === "am" && hours >= 6)
    return (
      <h1>
        Good morning, {name} {emoji("🌅")}
      </h1>
    );
  if (ampm === "pm" && hours < 6)
    return (
      <h1>
        Hello, {name} {emoji("☀️")}
      </h1>
    );
  if (ampm === "pm" && hours <= 23)
    return (
      <h1>
        Good evening, {name} {emoji("🌇")}
      </h1>
    );
  return (
    <h1>
      Good night, {name} {emoji("🌃")}
    </h1>
  );
};



export default function DashboardLayout({ data }) {
  const { hours, ampm } = useTime({ format: "12-hour" });
  return (
    <div className={s.dashboard}>
      <div className={s.content}>
        <header>
          {greeting(hours, ampm, "Lera")}
          <p>Have a nice day!</p>
        </header>
        <main>
          {Object.entries(data).map(
            ([type, info], id) =>
              !!info.data.length && (
                <div key={id}>
                  <header className={s.graph_header}>
                    <Link to={`/dashboard/${type}`}>
                      <p>{type}</p>
                    </Link>
                    <span>
                      {info.data[info.data.length - 1]?.value}
                      {info.prefix}
                    </span>
                  </header>
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
              )
          )}
        </main>
      </div>
      <DashboardSidebar />
    </div>
  );
}
