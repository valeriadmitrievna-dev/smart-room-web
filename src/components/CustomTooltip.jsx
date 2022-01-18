import format from "date-fns/format";
import React from "react";
import s from "~/styles/dashboard.module.scss";

const CustomTooltip = ({ active, payload, prefix }) => {
  if (active && payload && payload.length) {
    const pDate = payload[0]?.payload?.date || "";
    const date = pDate.split(" ")[0].split(".").reverse().join("-");
    return (
      <div className={s.tooltip}>
        <span>
          {format(new Date(date + "T" + pDate.split(" ")[1]), "dd.MM.yyyy")}
        </span>
        <span>
          {format(new Date(date + "T" + pDate.split(" ")[1]), "H:mm")}
        </span>
        <p className={s.value}>
          {payload[0].value}
          {prefix}
        </p>
      </div>
    );
  }
  return null;
};

export default CustomTooltip;
