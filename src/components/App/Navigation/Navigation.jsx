import { NavLink } from "react-router-dom";
import clsx from "clsx";
import css from "./Navigation.module.css";

export default function Navigation() {
  const linkClass = ({ isActive }) => {
    return clsx(css.navLink, isActive && css.isActive);
  };

  return (
    <nav className={css.nav}>
      <NavLink className={linkClass} to="/">
        Home
      </NavLink>
      <NavLink className={linkClass} to="/movies">
        Movies
      </NavLink>
    </nav>
  );
}
