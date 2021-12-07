import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import * as movieAPI from "../services/movieApi";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, List, Pagination, Stack, Paper } from "@mui/material";
import { ImageNotSupported } from "@mui/icons-material";

const styles = {
  container: {
    display: "flex",
    flexWrap: "wrap",
    // width: 1200,
    // marginLeft: "auto",
    marginRight: -30,
  },
};

const HomePage = () => {
  const location = useLocation();
  const [trendMovies, setTrendMovies] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    movieAPI
      .fetchTrending(page)
      .then((response) => setTrendMovies(response.data));
  }, [page]);

  return (
    <>
      {trendMovies && (
        <>
          <List style={styles.container}>
            {trendMovies.results.map((movie) => (
              <li key={movie.id} style={{ marginRight: 30, marginBottom: 30 }}>
                <Link
                  to={{
                    pathname: `/movies/${movie.id}`,
                    state: { from: location },
                  }}
                  style={{ textDecoration: "none" }}
                >
                  <Card sx={{ maxWidth: 363 }}>
                    <CardActionArea>
                      {/* <CardMedia
                        component="img"
                        // height="140"
                        src={`https://image.tmdb.org/t/p/w400/${movie.backdrop_path}`}
                        alt={movie.original_title}
                      /> */}
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
              count={50}
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
    </>
  );
};

export default HomePage;
