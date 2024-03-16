import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3";

const options = {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMTRhNTdhZDNjMmRkYTRkMjBhZjQxNDAxNTIxYmY5MCIsInN1YiI6IjY1ZjQyN2NkMWZhMWM4MDE5NjVjNGRhZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.obsE0qYh3CQHZFYfs9tZGlFMPnFsMyk5kwPVKwfjm5g",
  },
  params: {
    language: "en-US",
  },
};

export const getTrendingMovies = async () => {
  try {
    const response = await axios.get("/trending/movie/day", options);
    return response.data.results;
  } catch (e) {
    console.error(e);
  }
};

export const getMovieById = async (movieId) => {
  try {
    const response = await axios.get(`/movie/${movieId}`, options);
    return response.data;
  } catch (e) {
    console.error(e);
  }
};

export const getMovieCast = async (movieId) => {
  try {
    const response = await axios.get(`/movie/${movieId}/credits`, options);
    return response.data;
  } catch (e) {
    console.error(e);
  }
};

export const getMovieReviews = async (movieId) => {
  try {
    const response = await axios.get(`/movie/${movieId}/reviews`, options);
    return response.data.results;
  } catch (e) {
    console.error(e);
  }
};
