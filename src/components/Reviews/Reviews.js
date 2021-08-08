import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import * as movieAPI from "../../services/movieApi";
import shortid from "shortid";

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
            <li key={shortid.generate}>
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
  movieId: PropTypes.string.isRequired,
};

export default Reviews;
