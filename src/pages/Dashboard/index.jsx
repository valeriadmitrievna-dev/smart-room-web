import React, { useEffect, useState } from "react";
import DashboardLayout from "./index.layout";

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

export default function Dashboard() {
  const [graphsData, setGraphsData] = useState(data);

  useEffect(() => {
    const updateData = setInterval(() => {
      setGraphsData(props => ({
        ...props,
        temperature: {
          ...props.temperature,
          data: [
            ...props.temperature.data,
            {
              date: "07:59",
              value: Math.round(Math.random() * 10),
            },
          ].slice(-10),
        },
      }));
    }, 5000);
    return () => {
      clearInterval(updateData);
    };
  }, []);

  return <DashboardLayout data={graphsData} />;
}
