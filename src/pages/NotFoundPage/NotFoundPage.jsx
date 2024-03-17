import { NavLink } from "react-router-dom";
import css from "./NotFoundPage.module.css";

export default function NotFoundPage() {
  return (
    <div className={css.noFoundWrapper}>
      <p>Sorry, the page was not found try to reload the page or</p>
      <NavLink className={css.btn} to="/">
        click to go to the main page
      </NavLink>
    </div>
  );
}
