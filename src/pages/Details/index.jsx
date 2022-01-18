import React from "react";
import DetailsLayout from "./index.layout";
import db from "~/firebase";
import { onSnapshot, collection, query, orderBy } from "firebase/firestore";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateStat } from "~/redux/graph";
import { useState } from "react";
import {
  isWithinInterval,
  subHours,
  subDays,
  format,
  startOfDay,
  endOfDay,
  isSameDay,
  subYears,
  subMonths,
  startOfMonth,
  isSameMonth,
} from "date-fns";

const types = ["temperature", "humidity"];

export default function Details() {
  const dispatch = useDispatch();
  const data = useSelector(state => state.graph);
  const [graph, setGraph] = useState([]);
  const [filter, setFilter] = useState(0);

  const handleChangeFilter = e => {
    const f = [...e.target.parentNode.children].indexOf(e.target);
    setFilter(f);
    updateByFilter(f);
  };

  useEffect(() => {
    let unsub;
    types.forEach(type => {
      unsub = onSnapshot(
        query(collection(db, type), orderBy("date")),
        querySnapshot => {
          dispatch(
            updateStat({
              type,
              data: querySnapshot.docs.map(item => ({
                id: item.id,
                value: item.data().value,
                date: item.data().date.toDate(),
              })),
            })
          );
        }
      );
    });
    return () => {
      unsub();
    };
  }, []);

  const updateByFilter = (f = filter) => {
    switch (f) {
      case 0:
        setGraph(
          Object.entries(data)[0][1]
            .data.filter(d =>
              isWithinInterval(new Date(d.date), {
                start: subHours(new Date(), 24),
                end: new Date(),
              })
            )
            .map((temp, id) => ({
              temperature: temp.value,
              date: temp.date,
              humidity: Object.entries(data)[1][1].data[id]?.value,
            }))
        );
        break;
      case 1:
        setGraph(
          Object.entries(data)[0][1]
            .data.filter(d =>
              isWithinInterval(new Date(d.date), {
                start: subHours(new Date(), 72),
                end: new Date(),
              })
            )
            .map((temp, id) => ({
              temperature: temp.value,
              date: temp.date,
              humidity: Object.entries(data)[1][1].data[id]?.value,
            }))
        );
        break;
      case 2:
        const days = [];
        for (let i = 1; i <= 7; i++) {
          const work = Object.entries(data)[0][1]
            .data.filter(d =>
              isWithinInterval(new Date(d.date), {
                start: startOfDay(subDays(new Date(), 7 - i)),
                end: endOfDay(new Date()),
              })
            )
            .map((temp, id) => ({
              temperature: temp.value,
              date: temp.date,
              humidity: Object.entries(data)[1][1].data[id]?.value,
            }));
          days.push({
            date: startOfDay(subDays(new Date(), 7 - i)),
            temperature:
              parseFloat(
                (
                  work
                    .filter(w =>
                      isSameDay(
                        new Date(w.date),
                        startOfDay(subDays(new Date(), 7 - i))
                      )
                    )
                    .map(w => w.temperature)
                    .reduce((a, b) => a + b, 0) /
                  work.filter(w =>
                    isSameDay(
                      new Date(w.date),
                      startOfDay(subDays(new Date(), 7 - i))
                    )
                  ).length
                ).toFixed(1)
              ) || 0,
            humidity:
              parseFloat(
                (
                  work
                    .filter(w =>
                      isSameDay(
                        new Date(w.date),
                        startOfDay(subDays(new Date(), 7 - i))
                      )
                    )
                    .map(w => w.humidity)
                    .reduce((a, b) => a + b, 0) /
                  work.filter(w =>
                    isSameDay(
                      new Date(w.date),
                      startOfDay(subDays(new Date(), 7 - i))
                    )
                  ).length
                ).toFixed(1)
              ) || 0,
          });
        }
        setGraph(days);
        break;
      case 3:
        const month = [];
        for (let i = 1; i <= 31; i++) {
          const work = Object.entries(data)[0][1]
            .data.filter(d =>
              isWithinInterval(new Date(d.date), {
                start: startOfDay(subDays(new Date(), 31 - i)),
                end: endOfDay(new Date()),
              })
            )
            .map((temp, id) => ({
              temperature: temp.value,
              date: temp.date,
              humidity: Object.entries(data)[1][1].data[id]?.value,
            }));
          month.push({
            date: startOfDay(subDays(new Date(), 31 - i)),
            temperature:
              parseFloat(
                (
                  work
                    .filter(w =>
                      isSameDay(
                        new Date(w.date),
                        startOfDay(subDays(new Date(), 31 - i))
                      )
                    )
                    .map(w => w.temperature)
                    .reduce((a, b) => a + b, 0) /
                  work.filter(w =>
                    isSameDay(
                      new Date(w.date),
                      startOfDay(subDays(new Date(), 31 - i))
                    )
                  ).length
                ).toFixed(1)
              ) || 0,
            humidity:
              parseFloat(
                (
                  work
                    .filter(w =>
                      isSameDay(
                        new Date(w.date),
                        startOfDay(subDays(new Date(), 31 - i))
                      )
                    )
                    .map(w => w.humidity)
                    .reduce((a, b) => a + b, 0) /
                  work.filter(w =>
                    isSameDay(
                      new Date(w.date),
                      startOfDay(subDays(new Date(), 31 - i))
                    )
                  ).length
                ).toFixed(1)
              ) || 0,
          });
        }
        setGraph(month);
        break;
      case 4:
        const year = [];
        for (let i = 1; i <= 12; i++) {
          const work = Object.entries(data)[0][1]
            .data.filter(d =>
              isWithinInterval(new Date(d.date), {
                start: startOfMonth(subMonths(new Date(), 12 - i)),
                end: endOfDay(new Date()),
              })
            )
            .map((temp, id) => ({
              temperature: temp.value,
              date: temp.date,
              humidity: Object.entries(data)[1][1].data[id]?.value,
            }));
          year.push({
            date: startOfMonth(subMonths(new Date(), 12 - i)),
            temperature:
              parseFloat(
                (
                  work
                    .filter(w =>
                      isSameMonth(
                        new Date(w.date),
                        startOfMonth(subMonths(new Date(), 12 - i))
                      )
                    )
                    .map(w => w.temperature)
                    .reduce((a, b) => a + b, 0) /
                  work.filter(w =>
                    isSameMonth(
                      new Date(w.date),
                      startOfMonth(subMonths(new Date(), 12 - i))
                    )
                  ).length
                ).toFixed(1)
              ) || 0,
            humidity:
              parseFloat(
                (
                  work
                    .filter(w =>
                      isSameMonth(
                        new Date(w.date),
                        startOfMonth(subMonths(new Date(), 12 - i))
                      )
                    )
                    .map(w => w.humidity)
                    .reduce((a, b) => a + b, 0) /
                  work.filter(w =>
                    isSameMonth(
                      new Date(w.date),
                      startOfMonth(subMonths(new Date(), 12 - i))
                    )
                  ).length
                ).toFixed(1)
              ) || 0,
          });
        }
        setGraph(year);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    updateByFilter();
  }, [data]);

  return (
    !!graph.length && (
      <DetailsLayout
        types={types}
        filter={filter}
        handleChangeFilter={handleChangeFilter}
        data={graph}
      />
    )
  );
}
