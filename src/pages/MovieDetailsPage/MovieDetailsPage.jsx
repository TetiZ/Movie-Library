import { useState, useEffect, useRef } from "react";
import { Outlet, useParams, NavLink, useLocation } from "react-router-dom";
import { getMovieById, getImgPath } from "../../movies-api";
import css from "./MovieDetailsPage.module.css";
import clsx from "clsx";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [img, setImg] = useState("");
  const location = useLocation();
  const backLinkRef = useRef(location.state ?? "/movies");

  const noPoster =
    "https://images.unsplash.com/photo-1595452767427-0905ad9b036d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NzU0Mjh8MHwxfHNlYXJjaHwzfHxxdWVzdGlvbnxlbnwwfHx8fDE3MTA2ODQzMDh8MA&ixlib=rb-4.0.3&q=80&w=1080";

  const linkClass = ({ isActive }) => {
    return clsx(css.navLink, isActive && css.isActive);
  };

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        const [movieData, imgData] = await Promise.all([
          getMovieById(movieId),
          getImgPath(movieId),
        ]);

        const baseURL = imgData.images.base_url;
        const size = imgData.images.poster_sizes[5];
        const posterPath = movieData.poster_path;

        setMovie(movieData);
        setImg(posterPath && `${baseURL}${size}${posterPath}`);
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, [movieId]);

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && (
        <p>
          Oops! There's been some kind of mistake. Just try to reload the page
        </p>
      )}
      <NavLink className={css.btn} to={backLinkRef.current}>
        Go Back
      </NavLink>
      {movie && (
        <div className={css.details}>
          <div className={css.img}>
            <img src={img ? img : noPoster} alt="movie poster" />
          </div>
          <div className={css.info}>
            <h2>
              {movie.title} ({movie.release_date.slice(0, 4)})
            </h2>
            <p>User score: {movie.vote_average.toFixed(1) * 10}%</p>
            <h3>Overview</h3>
            <p>{movie.overview}</p>
            <h3>Genres</h3>
            <p>{movie.genres.map((genre) => genre.name).join(", ")}</p>
          </div>
        </div>
      )}

      <hr />
      <ul>
        <li className={css.listItem}>
          <NavLink className={linkClass} to="cast">
            Cast
          </NavLink>
        </li>
        <li className={css.listItem}>
          <NavLink className={linkClass} to="reviews">
            Reviews
          </NavLink>
        </li>
      </ul>

      <Outlet />
      <hr />
    </>
  );
}
