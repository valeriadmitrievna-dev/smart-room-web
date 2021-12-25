import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addOnePoint } from "~/redux/graph";
import DashboardLayout from "./index.layout";

const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

export default function Dashboard() {
  const data = useSelector(state => state.graph);
  const dispatch = useDispatch();

  useEffect(() => {
    const updateDataStatic = () => {
      dispatch(
        addOnePoint({
          temperature: {
            date: new Date(),
            value: random(-10, 5),
          },
          humidity: {
            date: new Date(),
            value: random(20, 60),
          },
          illumination: {
            date: new Date(),
            value: random(150, 300),
          },
          hydrocarbons: {
            date: new Date(),
            value: random(75, 130),
          },
        })
      );
    };
    updateDataStatic();
    const updateData = setInterval(updateDataStatic, 1000);
    return () => {
      clearInterval(updateData);
    };
  }, []);

  return <DashboardLayout data={data} />;
}
