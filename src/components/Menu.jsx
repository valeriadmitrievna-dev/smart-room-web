import React from "react";
import s from "@styles/menu.module.scss";
import { Link, useLocation } from "react-router-dom";

const routes = ["dashboard", "members", "chat", "devices", "settings"];

export default function Menu() {
  const pathname = useLocation().pathname.replace('/', '');
  
  return (
    <nav className={s.navigation}>
      {routes.map(route => (
        <Link to={`/${route}`}>
          <span data-active={pathname.startsWith(route)}>{route}</span>
        </Link>
      ))}
    </nav>
  );
}
