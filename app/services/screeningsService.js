import { apiMovieTheater } from "./apiClient";

export async function getMovieScreenings(movieId) {
    try {
        const response = await apiMovieTheater.get(`/movies.json`);
        const usersData = response.data;
        const movie = usersData.find((movie) => movie.id === movieId);

        return movie.movie_screenings;
    } catch (error) {
        throw new Error(`Error fetching movie screenings for movie ID ${movieId}`);
    }
}
