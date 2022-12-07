import {
  Outlet,
  Link,
  NavLink,
  useMatch,
  useResolvedPath,
} from "react-router-dom";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function Layout() {
  return (
    <nav className="nav">
      <CustomLink to="/"> 
      <h1>Projektas</h1>
      </CustomLink>

      <ul>
        <CustomLink to="/customers">Klientai </CustomLink>
        <CustomLink to="/items">Prekės </CustomLink>
        <CustomLink to="/invoices">Sąskaitos </CustomLink>
      </ul>
    </nav>
  );
}
function CustomLink({ to, children, ...props }) {
  // const path = window.location.pathname
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}
