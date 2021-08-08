import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "8441fc3e229ce986c7fcac1ecd75ed97";

async function mainFetch(url) {
  return await axios
    .get(url)
    .then((response) => {
      if (response.status === 200) {
        return response;
      }

      return Promise.reject(new Error("No match found"));
    })
    .catch((error) => console.log(error));
}

export function fetchTrending() {
  return mainFetch(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`);
}

export function fetchSearchMovie(searchQuery) {
  return mainFetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${searchQuery}&include_adult=false`
  );
}

export function fetchMovieDetails(movieId) {
  return mainFetch(
    `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`
  );
}

export function fetchMovieCredits(movieId) {
  return mainFetch(
    `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`
  );
}

export function fetchMovieReviews(movieId) {
  return mainFetch(
    `${BASE_URL}/movie/${movieId}/reviews?api_key=${API_KEY}&language=en-US`
  );
}
