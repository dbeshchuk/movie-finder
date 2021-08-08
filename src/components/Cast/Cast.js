import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import * as movieAPI from "../../services/movieApi";
import shortid from "shortid";

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
            <li key={shortid.generate()}>
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
  movieId: PropTypes.string.isRequired,
};

export default Cast;
