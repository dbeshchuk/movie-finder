import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import * as movieAPI from "../services/movieApi";

const HomePage = () => {
  const location = useLocation();
  const [trendMovies, setTrendMovies] = useState(null);
  // const { url } = useRouteMatch();

  useEffect(() => {
    movieAPI
      .fetchTrending()
      .then((response) => setTrendMovies([...response.data.results]));
  }, []);

  // useEffect(() => {
  //   console.log(trendMovies);
  // }, [trendMovies]);

  return (
    <>
      {trendMovies && (
        <ul>
          {trendMovies.map((movie) => (
            <li key={movie.id}>
              <Link
                to={{
                  pathname: `/movies/${movie.id}`,
                  state: { from: location },
                }}
              >
                {movie.original_title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default HomePage;
