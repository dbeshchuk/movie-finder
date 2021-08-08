import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import * as movieAPI from "../../services/movieApi";

const Cast = ({ movieId }) => {
  const [credits, setCredits] = useState(null);

  useEffect(() => {
    movieAPI
      .fetchMovieCredits(movieId)
      .then((response) => setCredits([...response.data.cast]));
  }, [movieId]);

  return (
    <>
      {credits && (
        <ul>
          {credits.map((actor) => (
            <li key={actor.cast_id}>
              <img
                src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                alt={`Didn't found`}
              />
              <p>{actor.name}</p>
              <p>Character: {actor.character}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

Cast.propTypes = {
  movieId: PropTypes.number.isRequired,
};

export default Cast;
