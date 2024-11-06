import { apiMovies } from "./apiClient";

const API_KEY = "df206deae15646e9166c5f330a509970";

export async function getMovieDetails(id) {
    try {
        const response = await apiMovies.get(`/movie/${id}?api_key=${API_KEY}&language=pt-BR`);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching movie details for ID ${id}`);
    }
}

export async function getMovieCredits(id) {
    try {
        const response = await apiMovies.get(`/movie/${id}/credits?api_key=${API_KEY}&language=pt-BR`);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching movie credits for ID ${id}`);
    }
}
