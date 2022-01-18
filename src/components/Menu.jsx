import React from "react";
import s from "~styles/menu.module.scss";
import { Link, useLocation } from "react-router-dom";

const routes = [
  {
    path: "dashboard",
    icon: "apps-outline",
  },
  {
    path: "details",
    icon: "stats-chart-outline",
  },
  {
    path: "devices",
    icon: "cube-outline",
  },
  {
    path: "settings",
    icon: "settings-outline",
  },
];

export default function Menu() {
  const pathname = useLocation().pathname.replace("/", "");

  return (
    <nav className={s.navigation}>
      {routes.map((route, id) => (
        <Link to={`/${route.path}`} key={id}>
          <p data-active={pathname.startsWith(route.path)}>
            <ion-icon name={route.icon}></ion-icon>
            <span>{route.path}</span>
          </p>
        </Link>
      ))}
    </nav>
  );
}
