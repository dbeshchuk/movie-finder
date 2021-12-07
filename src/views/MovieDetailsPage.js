import React from "react";
import { useState, useEffect, useRef } from "react";
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

import { Button, Card, Rating, Typography, Tabs, Tab } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";

const MovieDetailsPage = () => {
  const { url, path } = useRouteMatch();
  const history = useHistory();
  const location = useLocation();
  const { current } = useRef(location?.state?.from ?? "/");
  const [movieDetails, setMovieDetails] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    movieAPI
      .fetchMovieDetails(movieId)
      .then((response) => setMovieDetails(response.data));
  }, [movieId]);

  const onGoBack = () => {
    history.push(current);
  };

  const styles = {
    container: {
      display: "flex",
      flexWrap: "wrap",
      width: 900,
      marginLeft: "auto",
      marginRight: "auto",
      // marginRight: -30,
    },
    info: {
      width: 400,
      marginTop: "auto",
      marginBottom: "auto",
      marginLeft: "auto",
      marginRight: "auto",
    },
    image: {
      width: 350,
    },
    genres: {
      display: "inline-flex",
      flexWrap: "wrap",
      paddingLeft: 0,
      marginLeft: -5,
      marginBottom: -5,
      // marginRight: "auto",
    },
    genresContainer: {
      marginLeft: "auto",
      marginRight: "auto",
      alignItems: "center",
      justifyContent: "center",
    },
    tab: {
      // fontWeight: "bold",
      marginTop: 20,
      marginBottom: 20,
      // color: "#1976d2",
      // borderTop: "3px solid #1976d2",
      // borderBottom: "3px solid #1976d2",
    },
    activeTab: {
      fontWeight: "bold",
      // marginTop: 20,
      // marginBottom: 20,
      color: "#1976d2",
      borderTop: "3px solid #1976d2",
      borderBottom: "3px solid #1976d2",
    },
  };

  return (
    <>
      <Button
        type="button"
        style={{ marginBottom: 30 }}
        onClick={onGoBack}
        variant="outlined"
        startIcon={<ArrowBack />}
      >
        Go back
      </Button>
      <br />

      {movieDetails && (
        <>
          <Card style={styles.container}>
            <img
              src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
              alt={movieDetails.original_title}
              width="350"
            />

            <div style={styles.info}>
              {/* <h1>{movieDetails.original_title}</h1> */}
              <Typography
                variant="h5"
                color="text.primary"
                component="h1"
                style={{
                  marginBottom: 15,
                }}
              >
                {`${
                  movieDetails.original_title
                } (${movieDetails.release_date.slice(0, 4)})`}
              </Typography>

              {/* <p>Average Score: {movieDetails.vote_average / 2}</p> */}

              <Rating
                name="read-only"
                value={movieDetails.vote_average / 2}
                precision={0.5}
                readOnly
              />

              {/* <h3>Genres:</h3> */}

              <div style={styles.genresContainer}>
                <ul style={styles.genres}>
                  {movieDetails.genres.map((genre) => (
                    <li
                      key={shortid.generate()}
                      style={{ marginLeft: 5, marginBottom: 5 }}
                    >
                      <Button variant="outlined" size="small">
                        {genre.name}
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* <h2>Overview:</h2> */}

              <Typography
                variant="body1"
                color="text.primary"
                style={{ marginTop: 15 }}
              >
                {movieDetails.overview}
              </Typography>

              {/* <p>{movieDetails.overview}</p> */}
            </div>
          </Card>

          <Tabs value={false} centered>
            <Tab
              label="Cast"
              to={`${url}/credits`}
              component={React.memo(NavLink)}
              style={styles.tab}
              activeStyle={styles.activeTab}
            />

            <Tab
              label="Reviews"
              to={`${url}/reviews`}
              component={React.memo(NavLink)}
              style={styles.tab}
              activeStyle={styles.activeTab}
            />
          </Tabs>

          {/* <NavLink
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
          </NavLink> */}

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
