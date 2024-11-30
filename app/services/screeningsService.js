import { apiMovieTheater } from "./apiClient";

export async function getAllMovieScreenings() {
  try {
    const response = await apiMovieTheater.get("/movies.json");
    const moviesData = response.data;
    return moviesData;
  } catch (error) {
    throw new Error("Error fetching movies screenings");
  }
}

export async function getMovieScreenings(movieId) {
  try {
    const response = await apiMovieTheater.get(`/movies.json`);
    const moviesData = response.data;
    const movie = moviesData.find((movie) => movie.id === movieId);

    return movie.movie_screenings;
  } catch (error) {
    throw new Error(`Error fetching movie screenings for movie ID ${movieId}`);
  }
}

export async function addNewScreening(movieId, screening, poster) {
  try {
    const response = await apiMovieTheater.get(`/movies.json`);
    const movies = response.data || [];

    let movieIndex = movies.findIndex((movie) => movie.id === movieId);

    if (movieIndex === -1) {
      movies.push({
        id: movieId,
        comments: [],
        movie_screenings: [screening],
        poster_path: poster
      });
    } else {
      movies[movieIndex].movie_screenings = [
        ...movies[movieIndex].movie_screenings,
        screening,
      ];
    }

    await apiMovieTheater.put(`/movies.json`, movies);
  } catch (error) {
    throw new Error(`Error adding movie screenings for movie ID ${movieId}`);
  }
}
