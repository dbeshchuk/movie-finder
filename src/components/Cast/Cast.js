import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import * as movieAPI from "../../services/movieApi";
import shortid from "shortid";

import { List, Paper } from "@mui/material";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { ImageNotSupported } from "@mui/icons-material";

const styles = {
  container: {
    display: "flex",
    flexWrap: "wrap",
    width: 1150,

    marginLeft: -15,
  },
};

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
        <List style={styles.container}>
          {credits.map((actor) => (
            <li
              key={shortid.generate()}
              style={{ marginLeft: 30, marginBottom: 30 }}
            >
              {/* <img
                src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                alt={`Didn't found`}
              />
              <p>{actor.name}</p>
              <p>Character: {actor.character}</p> */}
              <Card sx={{ maxWidth: 200 }}>
                {/* <CardActionArea> */}
                {actor.profile_path ? (
                  <CardMedia
                    component="img"
                    src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                    alt={actor.name}
                  />
                ) : (
                  <Paper
                    elevation={0}
                    style={{
                      height: 180,
                      width: 200,
                      paddingTop: 120,
                      backgroundColor: "#eeeeee",
                    }}
                    square
                  >
                    <ImageNotSupported sx={{ margin: "auto", fontSize: 60 }} />
                  </Paper>
                )}
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="body1"
                    color="text.primary"
                    component="div"
                  >
                    {actor.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {actor.character}
                  </Typography>
                </CardContent>
                {/* </CardActionArea> */}
              </Card>
            </li>
          ))}
        </List>
      )}
    </>
  );
};

Cast.propTypes = {
  movieId: PropTypes.string.isRequired,
};

export default Cast;
