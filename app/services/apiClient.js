import axios from "axios";

export const apiMovies = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

export const apiMovieTheater = axios.create({
    baseURL: "https://pipocamania-295c5-default-rtdb.firebaseio.com/",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});
