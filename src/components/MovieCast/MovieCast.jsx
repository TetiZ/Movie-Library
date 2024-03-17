import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMovieCast } from "../../movies-api";

export default function MovieCast() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        const data = await getMovieCast(movieId);
        setMovie(data);
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
      {movie && (
        <div>
          {movie.cast.map((cast) => (
            <li key={cast.cast_id}>
              <p>{cast.name}</p>
              <p>Character: {cast.character}</p>
            </li>
          ))}
        </div>
      )}
    </>
  );
}
