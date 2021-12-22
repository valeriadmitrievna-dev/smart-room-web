import React from "react";
import s from "@/styles/dashboard.module.scss";
import DashboardSidebar from "@/components/DashboardSidebar";

export default function DashboardLayout({ weather, time }) {
  return (
    <div className={s.dashboard}>
      <div>ff</div>
      <DashboardSidebar />
    </div>
  );
}
