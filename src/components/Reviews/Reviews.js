import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import * as movieAPI from "../../services/movieApi";

const Reviews = ({ movieId }) => {
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    movieAPI
      .fetchMovieReviews(movieId)
      .then((response) => setReviews([...response.data.results]));
  }, [movieId]);

  // useEffect(() => {
  //   console.log(reviews);
  // }, [reviews]);

  return (
    <>
      {reviews && (
        <ul>
          {reviews.map((result) => (
            <li key={result.author}>
              <h3>{result.author}</h3>
              <p>{result.content}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

Reviews.propTypes = {
  movieId: PropTypes.number.isRequired,
};

export default Reviews;
