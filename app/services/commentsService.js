import { apiMovieTheater } from "./apiClient";

export async function getMovieComments(movieId) {
    try {
        const response = await apiMovieTheater.get(`/movies.json`);
        const usersData = response.data;
        const movie = usersData.find((movie) => movie.id === movieId);

        if (movie) {
            return movie.comments || [];
        } else {
            return [];
        }
    } catch (error) {
        throw new Error(`Error fetching movie comments for movie ID ${id}`);
    }
}

export async function getMovieCommentByUser(userId, movie) {
    try {
        const response = await apiMovieTheater.get(`/users.json`);
        const usersData = response.data;
        const user = usersData.find((user) => user.id === userId);

        const reviews = user.myReviews || [];
        const review = reviews.find((review) => review.id === movie);

        if (review) {
            return review;
        } else {
            return { stars: 0, comment: "" };
        }
    } catch (error) {
        throw new Error(`Error fetching movie comments for movie`);
    }
}

export async function saveComment(movieId, comment) {
    try {
        const response = await apiMovieTheater.get(`/movies.json`);
        const movies = response.data;

        const movieIndex = movies.findIndex((movie) => movie.id === movieId);
        const movie = movies[movieIndex];

        const updateComments = [...movie.comments, comment];
        movies[movieIndex].comments = updateComments;

        await apiMovieTheater.put(`/movies.json`, movies);
    } catch (error) {
        throw new Error("Error submitting comment");
    }
}
