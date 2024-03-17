import { NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { getImgPath } from "../../movies-api";
import css from "./MovieList.module.css";

export default function MovieList({ movies }) {
  const [img, setImg] = useState("");
  const location = useLocation();

  const noPoster =
    "https://images.unsplash.com/photo-1595452767427-0905ad9b036d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NzU0Mjh8MHwxfHNlYXJjaHwzfHxxdWVzdGlvbnxlbnwwfHx8fDE3MTA2ODQzMDh8MA&ixlib=rb-4.0.3&q=80&w=1080";

  useEffect(() => {
    async function fetchData() {
      try {
        const imgData = await getImgPath();
        const baseURL = imgData.images.base_url;
        const size = imgData.images.poster_sizes[5];
        setImg(`${baseURL}${size}`);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <ul className={css.list}>
        {img &&
          movies.map((movie) => (
            <li className={css.listItem} key={movie.id}>
              <NavLink
                className={css.title}
                to={`/movies/${movie.id}`}
                state={location}
              >
                <img
                  className={css.img}
                  src={
                    movie.poster_path ? `${img}${movie.poster_path}` : noPoster
                  }
                  alt="movie poster"
                />
                {movie.title}
              </NavLink>
            </li>
          ))}
      </ul>
    </>
  );
}
