import { NavLink, useLocation } from "react-router-dom";

export default function MovieList({ movies }) {
  return (
    <>
      <h1>Trending today</h1>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <NavLink to={`/movies/${movie.id}`}>{movie.title}</NavLink>
          </li>
        ))}
      </ul>
    </>
  );
}
