import { useEffect, useState } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  CardActionArea,
  List,
  IconButton,
  TextField,
  Pagination,
  Stack,
  Paper,
  // Rating,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { ImageNotSupported } from "@mui/icons-material";

import * as movieAPI from "../services/movieApi";

const styles = {
  container: {
    display: "flex",
    flexWrap: "wrap",
    marginTop: 30,
    marginRight: -30,
  },
};

const MoviesPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const location = useLocation();
  const history = useHistory();
  const [selectedMovies, setSelectedMovies] = useState(null);
  const [page, setPage] = useState(1);

  const onSearchSubmit = async (e) => {
    e.preventDefault();

    history.push({
      pathname: location.pathname,
      search: `query=${searchValue}`,
    });
  };

  const getMoviesList = async (value, page) => {
    if (value) {
      await movieAPI
        .fetchSearchMovie(value, page)
        .then((response) => setSelectedMovies(response.data));
    }
  };

  useEffect(() => {
    if (location.search) {
      const query = new URLSearchParams(location.search).get("query");
      getMoviesList(query, page);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search, page]);

  return (
    <>
      <form className="SearchForm" onSubmit={onSearchSubmit}>
        <TextField
          className="SearchForm-input"
          name="searchInput"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movies"
          size="small"
          InputProps={{
            endAdornment: (
              <IconButton
                type="submit"
                className="SearchForm-button"
                edge="end"
              >
                {/* <span className="SearchForm-button-label">Search</span> */}
                <SearchIcon />
              </IconButton>
            ),
          }}
        />
      </form>

      {/* <ul> */}
      {selectedMovies && (
        <>
          <List style={styles.container}>
            {selectedMovies.results.map((movie) => (
              <li key={movie.id} style={{ marginRight: 30, marginBottom: 30 }}>
                <Link
                  to={{
                    pathname: `/movies/${movie.id}`,
                    state: { from: location },
                  }}
                  style={{ textDecoration: "none" }}
                >
                  {/* {movie.original_title} */}

                  <Card sx={{ maxWidth: 363 }}>
                    <CardActionArea>
                      {movie.backdrop_path ? (
                        <CardMedia
                          component="img"
                          // height="140"
                          src={`https://image.tmdb.org/t/p/w400/${movie.backdrop_path}`}
                          alt={movie.original_title}
                        />
                      ) : (
                        <Paper
                          elevation={0}
                          style={{
                            height: 128,
                            paddingTop: 76,
                            backgroundColor: "#eeeeee",
                          }}
                          square
                        >
                          <ImageNotSupported
                            sx={{ margin: "auto", fontSize: 60 }}
                          />
                        </Paper>
                      )}

                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {movie.original_title}
                        </Typography>
                        {/* <Rating
                          name="read-only"
                          value={movie.vote_average / 2}
                          precision={0.5}
                          readOnly
                        /> */}
                        <Typography variant="body2" color="text.secondary">
                          {movie.overview}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Link>
              </li>
            ))}
          </List>

          <Stack spacing={2}>
            <Pagination
              count={selectedMovies.total_pages}
              variant="outlined"
              color="primary"
              onChange={(_event, page) => setPage(page)}
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                marginBottom: 40,
              }}
            />
          </Stack>
        </>
      )}
      {/* </ul> */}
    </>
  );
};

export default MoviesPage;
