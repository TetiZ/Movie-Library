import { useState, useEffect } from "react";
import { getTrendingMovies } from "../movies-api";
import MovieList from "../components/MovieList/MovieList";

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
      {error && <p>Error!</p>}
      <h1>Trending today</h1>
      <MovieList movies={movies} />
    </>
  );
}
