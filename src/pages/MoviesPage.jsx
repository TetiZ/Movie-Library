import { useSearchParams } from "react-router-dom";
import { getMoviesByQuery } from "../movies-api";
import { useEffect, useState } from "react";
import MovieList from "../components/MovieList/MovieList";

export default function MoviesPage() {
  const [params, setParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const query = params.get("query") ?? "";

  const submitHandler = (e) => {
    e.preventDefault();
    setParams({ query: e.target.elements.query.value });
    e.target.reset();
  };

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        const data = await getMoviesByQuery(query);
        setMovies(data);
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    if (query) {
      getData();
    }
  }, [query]);

  return (
    <>
      <form onSubmit={submitHandler}>
        <input type="text" name="query" required></input>
        <button>Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>Error!</p>}

      <MovieList movies={movies} />
    </>
  );
}
