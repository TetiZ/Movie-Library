import { useState, useEffect } from "react";
import { getTrendingMovies } from "../../movies-api";
import MovieList from "../../components/MovieList/MovieList";
import css from "./HomePage.module.css";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        const data = await getTrendingMovies();
        setMovies(data);
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, []);
  return (
    <>
      {loading && <p>Loading...</p>}
      {error && (
        <p>
          Oops! There's been some kind of mistake. Just try to reload the page
        </p>
      )}
      <h1 className={css.title}>Trending today</h1>
      <MovieList movies={movies} />
    </>
  );
}
