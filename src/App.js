import React, { Suspense, lazy } from "react";
import { Switch, Route } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";

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
    <div className="App">
      <Navigation />

      <Suspense fallback={<h1>Loading...</h1>}>
        <Switch>
          <Route path="/" exact component={HomePage} />

          <Route path="/movies" exact component={MoviesPage} />

          <Route path="/movies/:movieId" component={MovieDetailsPage} />
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
