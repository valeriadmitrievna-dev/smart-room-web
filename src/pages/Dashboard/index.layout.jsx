import React from "react";
import s from "@/styles/dashboard.module.scss";
import DashboardSidebar from "@/components/DashboardSidebar";

export default function DashboardLayout() {
  return (
    <div className={s.dashboard}>
      <div className={s.content}>ff</div>
      <DashboardSidebar />
    </div>
  );
}
