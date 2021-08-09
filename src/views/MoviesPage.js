import { useEffect, useState } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";

import * as movieAPI from "../services/movieApi";

const MoviesPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const location = useLocation();
  const history = useHistory();
  const [selectedMovies, setSelectedMovies] = useState(null);

  const onSearchSubmit = async (e) => {
    e.preventDefault();

    history.push({
      pathname: location.pathname,
      search: `query=${searchValue}`,
    });
  };

  const getMoviesList = async (value) => {
    if (value) {
      await movieAPI
        .fetchSearchMovie(value)
        .then((response) => setSelectedMovies(response.data.results));
    }
  };

  useEffect(() => {
    if (location.search) {
      const query = new URLSearchParams(location.search).get("query");
      getMoviesList(query);
    }
  }, [location.search]);

  return (
    <>
      <form className="SearchForm" onSubmit={onSearchSubmit}>
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          className="SearchForm-input"
          name="searchInput"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movies"
        />
      </form>

      <ul>
        {selectedMovies && (
          <ul>
            {selectedMovies.map((movie) => (
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
      </ul>
    </>
  );
};

export default MoviesPage;
