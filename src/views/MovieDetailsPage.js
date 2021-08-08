import { useState, useEffect } from "react";
import {
  useParams,
  Route,
  NavLink,
  useRouteMatch,
  useHistory,
  useLocation,
} from "react-router-dom";
import * as movieAPI from "../services/movieApi";

import Cast from "../components/Cast/Cast";
import Reviews from "../components/Reviews/Reviews";
import shortid from "shortid";

const MovieDetailsPage = () => {
  const { url, path } = useRouteMatch();
  const history = useHistory();
  const location = useLocation();

  const [movieDetails, setMovieDetails] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    movieAPI
      .fetchMovieDetails(movieId)
      .then((response) => setMovieDetails(response.data));
  }, [movieId]);

  // useEffect(() => {
  //   console.log(movieDetails);
  // }, [movieDetails]);

  const goBack = () => {
    history.push(location?.state?.from ?? "/");
  };

  return (
    <>
      <button type="button" className="back-button" onClick={goBack}>
        Go back
      </button>
      <br />

      {movieDetails && (
        <>
          <img
            src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
            alt={movieDetails.original_title}
          />

          <h1>{movieDetails.original_title}</h1>

          <p>Average Score: {movieDetails.vote_average}</p>

          <h2>Overview:</h2>

          <p>{movieDetails.overview}</p>

          <h3>Genres:</h3>

          <ul>
            {movieDetails.genres.map((genre) => (
              <li key={shortid.generate()}>{genre.name}</li>
            ))}
          </ul>

          <NavLink
            to={`${url}/credits`}
            className={"nav-link"}
            activeClassName={"active-nav-link"}
          >
            Cast
          </NavLink>
          <NavLink
            to={`${url}/reviews`}
            className={"nav-link"}
            activeClassName={"active-nav-link"}
          >
            Reviews
          </NavLink>

          <Route path={`${path}/credits`}>
            <Cast movieId={movieId} />
          </Route>

          <Route path={`${path}/reviews`}>
            <Reviews movieId={movieId} />
          </Route>
        </>
      )}
    </>
  );
};

export default MovieDetailsPage;
