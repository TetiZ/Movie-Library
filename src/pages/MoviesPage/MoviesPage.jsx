import { useSearchParams } from "react-router-dom";
import { getMoviesByQuery } from "../../movies-api";
import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import css from "./MoviesPage.module.css";

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
        <input
          className={css.input}
          type="text"
          name="query"
          placeholder="Type your keyword for search"
          pattern="[a-zA-Z0-9]+"
          required
        ></input>
        <button className={css.btn}>Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && (
        <p>
          Oops! There's been some kind of mistake. Just try to reload the page
        </p>
      )}

      {movies.length > 0 ? (
        <MovieList movies={movies} />
      ) : (
        <p>No movies found for your search :(</p>
      )}
    </>
  );
}
