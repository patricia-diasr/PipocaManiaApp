import { apiMovies } from "./apiClient";

export async function getMovieDetails(id) {
  try {
    const response = await apiMovies.get(
      `/movie/${id}?language=pt-BR`
    );
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching movie details for ID ${id}`);
  }
}

export async function getMovieCredits(id) {
  try {
    const response = await apiMovies.get(
      `/movie/${id}/credits?language=pt-BR`
    );
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching movie credits for ID ${id}`);
  }
}
