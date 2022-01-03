import React from "react";
import s from "~/styles/details.module.scss";
import {
  CartesianGrid,
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import CustomTooltip from "~/components/CustomTooltip";

const prefixes = {
  temperature: "°C",
  humidity: "%",
};

const CustomTick = props => {
  const { x, y, stroke, payload } = props;

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="end"
        fill="#666"
        transform="rotate(-35)"
      >
        {payload.value}
      </text>
    </g>
  );
};

export default function DetailsLayout({ data, type }) {
  return (
    <div>
      <h1 className={s.title}>{type}</h1>
      <div className={s.chart_container}>
        <ResponsiveContainer height={500}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#000" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#000" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Tooltip
              cursor={{ stroke: "rgba(0,0,0,0.25)", strokeWidth: 1 }}
              content={<CustomTooltip prefix={prefixes[type]} />}
            />
            <CartesianGrid stroke="rgba(0,0,0,0.25)" strokeDasharray="4" />
            <YAxis hide domain={["dataMin - 10", "dataMax + 10"]} />
            <Area
              type="monotone"
              dataKey="value"
              strokeWidth={2}
              activeDot={{ r: 4 }}
              stroke="#000"
              fillOpacity={1}
              fill="url(#color)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
