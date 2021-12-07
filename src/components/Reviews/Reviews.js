import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import * as movieAPI from "../../services/movieApi";
import shortid from "shortid";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

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
            <li key={shortid.generate()} style={{ marginBottom: 30 }}>
              <Card>
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="body1"
                    color="text.primary"
                    component="div"
                  >
                    {result.author}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {result.content}
                  </Typography>
                </CardContent>
              </Card>
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
