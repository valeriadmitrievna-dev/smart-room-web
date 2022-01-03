import React from "react";
import { useLocation } from "react-router-dom";
import DetailsLayout from "./index.layout";
import db from "~/firebase";
import { onSnapshot, collection, query, orderBy } from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";
import format from "date-fns/format";

export default function Details() {
  const type = useLocation()?.pathname?.replace("/dashboard/", "");
  const [data, setData] = useState([]);

  useEffect(() => {
    if (type) {
      const unsub = onSnapshot(
        query(collection(db, type), orderBy("date")),
        querySnapshot => {
          setData(
            querySnapshot.docs.map(item => ({
              id: item.id,
              value: item.data().value,
              date: item.data().date.toDate(),
            }))
          );
        }
      );
      return () => {
        unsub();
      };
    }
  }, [type]);

  return !!data.length ? <DetailsLayout data={data} type={type} /> : "Loading...";
}
