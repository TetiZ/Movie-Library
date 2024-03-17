import { useState, useEffect } from "react";
import { getMovieReviews } from "../../movies-api";
import { useParams } from "react-router-dom";
import css from "./MovieReviews.module.css";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        const data = await getMovieReviews(movieId);
        setReviews(data);
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
      {reviews.length > 0 ? (
        <ul>
          {reviews.map((review) => (
            <li key={review.id}>
              <h4>Author: {review.author}</h4>
              <p className={css.comment}>{review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>We don`t have any review for this movie</p>
      )}
    </>
  );
}
