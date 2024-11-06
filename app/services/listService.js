import { apiMovies } from "./apiClient";
import { apiMovieTheater } from "./apiClient";

const API_KEY = "df206deae15646e9166c5f330a509970";

export async function getUpcomingMovies() {
    try {
        const response = await apiMovies.get(`/movie/upcoming?api_key=${API_KEY}&language=pt-BR&region=BR`);
        return response.data.results.slice(0, 4);
    } catch (error) {
        throw new Error("Error fetching upcoming movies");
    }
}

export async function getPopularMovies() {
    try {
        const response = await apiMovies.get(`/movie/popular?api_key=${API_KEY}&language=pt-BR&region=BR`);
        return response.data.results;
    } catch (error) {
        throw new Error("Error fetching popular movies");
    }
}

export async function searchMovies(query) {
    try {
        const response = await apiMovies.get(
            `/search/movie?api_key=${API_KEY}&language=pt-BR&query=${encodeURIComponent(query)}&region=BR`
        );
        return response.data.results;
    } catch (error) {
        throw new Error("Error fetching movies by name");
    }
}

export async function getUserMovieLists(userId) {
    try {
        const response = await apiMovieTheater.get(`/users.json`);
        const users = response.data;
        const user = users.find((user) => user.id === userId);

        return user;
    } catch (error) {
        throw new Error("Error fetching user movie lists");
    }
}

export async function addMovieReviewList(userId, movie) {
    try {
        const response = await apiMovieTheater.get(`/users.json`);
        const users = response.data;

        const userIndex = users.findIndex((user) => user.id === userId);
        const user = users[userIndex];

        let reviews = user.myReviews || [];

        const movieIndex = reviews.findIndex((review) => review.id === movie.id);

        if (movieIndex !== -1) {
            reviews[movieIndex] = movie;
        } else {
            reviews = [...reviews, movie];
        }

        users[userIndex].myReviews = reviews;
        await apiMovieTheater.put(`/users.json`, users);
    } catch (error) {
        throw new Error("Error updating user reviews lists");
    }
}

export async function searchWatchList(userId, movieId) {
    try {
        const response = await apiMovieTheater.get(`/users.json`);
        const users = response.data;

        const user = users.find((user) => user.id === userId);
        const list = user.watchlist;

        const isInWatchList = list.find((movie) => movie.id === movieId);
        return isInWatchList;
    } catch (error) {
        throw new Error("Error searching movie in watchlist");
    }
}

export async function addMovieWatchList(userId, movie) {
    try {
        const response = await apiMovieTheater.get(`/users.json`);
        const users = response.data;

        const userIndex = users.findIndex((user) => user.id === userId);
        const user = users[userIndex];

        let watchlist = user.watchlist || [];

        const movieIndex = watchlist.findIndex((item) => item.id === movie.id);

        if (movieIndex === -1) {
            watchlist.push(movie);
        } else {
            console.log("Movie already in your watchlist");
        }

        users[userIndex].watchlist = watchlist;

        await apiMovieTheater.put(`/users.json`, users);
    } catch (error) {
        throw new Error("Error updating watchlist");
    }
}

export async function removeMovieWatchList(userId, movieId) {
    try {
        const response = await apiMovieTheater.get(`/users.json`);
        const users = response.data;

        const userIndex = users.findIndex((user) => user.id === userId);
        const user = users[userIndex];

        let watchlist = user.watchlist || [];
        watchlist = watchlist.filter((movie) => movie.id !== movieId);

        users[userIndex].watchlist = watchlist;
        await apiMovieTheater.put(`/users.json`, users);
    } catch (error) {
        throw new Error("Error updating watchlist");
    }
}
