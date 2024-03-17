import { NavLink, useLocation } from "react-router-dom";

export default function MovieList({ movies }) {
  const location = useLocation();
  return (
    <>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <NavLink to={`/movies/${movie.id}`} state={location}>
              {movie.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </>
  );
}
