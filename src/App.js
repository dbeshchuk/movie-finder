import React, { Suspense, lazy } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";

import { Container } from "@mui/material";

import "./App.css";

const HomePage = lazy(() =>
  import("./views/HomePage.js" /* webpackChunkName: "home-page" */)
);

const MoviesPage = lazy(() =>
  import("./views/MoviesPage.js" /* webpackChunkName: "movies-page" */)
);

const MovieDetailsPage = lazy(() =>
  import(
    "./views/MovieDetailsPage.js" /* webpackChunkName: "movie-details-page" */
  )
);

function App() {
  return (
    <Container
      className="App"
      style={{ width: 1200, marginLeft: "auto", marginRight: "auto" }}
    >
      <Navigation />

      <Suspense fallback={<h1>Loading...</h1>}>
        <Switch>
          <Route path="/" exact component={HomePage} />

          <Route path="/movies" exact component={MoviesPage} />

          <Route path="/movies/:movieId" component={MovieDetailsPage} />

          <Redirect to="/" />
        </Switch>
      </Suspense>
    </Container>
  );
}

export default App;
