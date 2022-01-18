import React from "react";
import s from "~/styles/details.module.scss";
import d from "~/styles/dashboard.module.scss";
import {
  CartesianGrid,
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import format from "date-fns/format";

const prefixes = {
  temperature: "°C",
  humidity: "%",
};

export default function DetailsLayout({
  data,
  types,
  filter,
  handleChangeFilter,
}) {
  return (
    <div>
      <div className={s.filters_container}>
        <button
          onClick={handleChangeFilter}
          className={filter === 0 ? s.active : ""}
        >
          24 h
        </button>
        <button
          onClick={handleChangeFilter}
          className={filter === 1 ? s.active : ""}
        >
          3 d
        </button>
        <button
          onClick={handleChangeFilter}
          className={filter === 2 ? s.active : ""}
        >
          7 d
        </button>
        <button
          onClick={handleChangeFilter}
          className={filter === 3 ? s.active : ""}
        >
          1 m
        </button>
        <button
          onClick={handleChangeFilter}
          className={filter === 4 ? s.active : ""}
        >
          1 y
        </button>
      </div>
      <div className={s.chart_container}>
        <div className={s.chart_legends}>
          {types.map((t, id) => (
            <div>
              <span id={t}></span>
              {t}
            </div>
          ))}
        </div>
        <ResponsiveContainer height={500}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="temperature_fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FAE451" stopOpacity={0.5} />
                <stop offset="95%" stopColor="#FAE451" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="humidity_fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7EE7D6" stopOpacity={0.5} />
                <stop offset="95%" stopColor="#7EE7D6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Tooltip
              cursor={{ stroke: "rgba(0,0,0,0.25)", strokeWidth: 1 }}
              content={<CustomTooltip filter={filter} />}
            />
            <CartesianGrid stroke="rgba(0,0,0,0.25)" strokeDasharray="4" />
            <YAxis hide domain={["dataMin - 1", "dataMax + 1"]} />
            <XAxis
              dataKey="date"
              domain={["auto", "auto"]}
              tickFormatter={v => format(new Date(v), "H:mm")}
              tick={<CustomTick filter={filter} />}
              tickLine={false}
            />
            {types.map((t, id) => (
              <Area
                key={id}
                type="monotone"
                dataKey={t}
                strokeWidth={2}
                activeDot={{ r: 4 }}
                fillOpacity={1}
                fill={`url(#${t}_fill)`}
                tooltipType={t}
                id={t}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

const CustomTooltip = ({ active, payload, filter }) => {
  if (active && payload && payload.length) {
    return (
      <div className={d.tooltip}>
        {filter === 0 && (
          <span>{format(new Date(payload[0].payload.date), "H:mm")}</span>
        )}
        {filter === 1 && (
          <>
            <span>{format(new Date(payload[0].payload.date), "H:mm")}</span>
            <span>
              {format(new Date(payload[0].payload.date), "dd.MM.yyyy")}
            </span>
          </>
        )}
        {filter === 2 && (
          <>
            <span>
              {format(new Date(payload[0].payload.date), "dd.MM yyyy")}
            </span>
            <span>{format(new Date(payload[0].payload.date), "EEEE")}</span>
          </>
        )}
        {filter === 3 && (
          <span>{format(new Date(payload[0].payload.date), "dd.MM yyyy")}</span>
        )}
        {filter === 4 && (
          <span>{format(new Date(payload[0].payload.date), "MMMM yyyy")}</span>
        )}
        {payload.map((p, id) => (
          <p key={id} id={p.type}>
            {p.value}
            {prefixes[p.type]}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const CustomTick = props => {
  const { x, y, payload, filter } = props;

  return (
    <text className={s.tick} x={x} y={y} dy={10} textAnchor="middle">
      {(filter === 0 || filter === 1) &&
        format(new Date(payload.value), "H:mm")}
      {filter === 2 && format(new Date(payload.value), "EEE")}
      {filter === 3 && format(new Date(payload.value), "do")}
    </text>
  );
};
