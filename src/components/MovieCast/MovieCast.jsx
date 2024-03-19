import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMovieCast, getImgPath } from "../../movies-api";
import css from "./MovieCast.module.css";

export default function MovieCast() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [img, setImg] = useState("");

  const noPhoto =
    "https://images.unsplash.com/photo-1549497538-303791108f95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NzU0Mjh8MHwxfHNlYXJjaHw5fHxhY3RvcnxlbnwwfHx8fDE3MTA2ODQwMjR8MA&ixlib=rb-4.0.3&q=80&w=1080";

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);

        const [movieData, imgData] = await Promise.all([
          getMovieCast(movieId),
          getImgPath(movieId),
        ]);

        const baseURL = imgData.images.base_url;
        const size = imgData.images.poster_sizes[5];

        setMovie(movieData);
        setImg(`${baseURL}${size}`);
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
      {movie.cast.length > 0 ? (
        <ul className={css.list}>
          {movie.cast.map((cast) => (
            <li className={css.listItem} key={cast.cast_id}>
              <div className={css.img}>
                <img
                  src={
                    cast.profile_path ? `${img}${cast.profile_path}` : noPhoto
                  }
                  alt="actor photo"
                />
              </div>
              <div>
                <p>{cast.name}</p>
                <p>Character: {cast.character}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>There are no information about this movie cast</p>
      )}
    </>
  );
}
