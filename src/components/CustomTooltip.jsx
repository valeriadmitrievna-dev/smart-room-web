import format from 'date-fns/format';
import React from 'react'
import s from "~/styles/dashboard.module.scss";

const CustomTooltip = ({ active, payload, prefix }) => {
  if (active && payload && payload.length) {
    return (
      <div className={s.tooltip}>
        <span>{format(new Date(payload[0].payload.date), "dd.MM.yyyy")}</span>
        <span>{format(new Date(payload[0].payload.date), "H:mm")}</span>
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
