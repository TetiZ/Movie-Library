import { useState, useEffect, useRef } from "react";
import { Outlet, useParams, NavLink, useLocation } from "react-router-dom";
import { getMovieById, getImgPath } from "../movies-api";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [img, setImg] = useState("");
  const location = useLocation();
  const backLinkRef = useRef(location.state ?? "/movies");

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
      {error && <p>Error!</p>}
      <NavLink to={backLinkRef.current}>Go Back</NavLink>
      {movie && (
        <div>
          <div>
            <img src={img} alt="movie poster" />
          </div>
          <div>
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
        <li>
          <NavLink to="cast">Cast</NavLink>
        </li>
        <li>
          <NavLink to="reviews">Reviews</NavLink>
        </li>
      </ul>

      <Outlet />
      <hr />
    </>
  );
}
