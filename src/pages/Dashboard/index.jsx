import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DashboardLayout from "./index.layout";
import db from "~/firebase";
import { onSnapshot, collection, query, orderBy } from "firebase/firestore";
import { format } from "date-fns";
import { updateHumidity, updateTemperature } from "../../redux/graph";

export default function Dashboard() {
  const data = useSelector(state => state.graph);
  const dispatch = useDispatch();
  const [stats, setStats] = useState([]);

  useEffect(() => {
    // listen temperature
    const unsub_temp = onSnapshot(
      query(collection(db, "temperature"), orderBy("date")),
      querySnapshot => {
        dispatch(
          updateTemperature(
            querySnapshot.docs
              .map(item => ({
                id: item.id,
                value: item.data().value,
                date: format(item.data().date.toDate(), "dd.MM.yyyy H:mm:ss"),
              }))
              .slice(-12)
          )
        );
      }
    );
    // listen humidity
    const unsub_humid = onSnapshot(
      query(collection(db, "humidity"), orderBy("date")),
      querySnapshot => {
        dispatch(
          updateHumidity(
            querySnapshot.docs
              .map(item => ({
                id: item.id,
                value: item.data().value,
                date: format(item.data().date.toDate(), "dd.MM.yyyy H:mm:ss"),
              }))
              .slice(-12)
          )
        );
      }
    );
    return () => {
      unsub_temp();
      unsub_humid();
    };
  }, []);

  return <DashboardLayout data={data} />;
}
