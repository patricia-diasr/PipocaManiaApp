import axios from "axios";

const API_BEARER_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZjIwNmRlYWUxNTY0NmU5MTY2YzVmMzMwYTUwOTk3MCIsIm5iZiI6MTczMjc1MTEzMS4xMTgxMTUyLCJzdWIiOiI2NjllZmQ1MmFkYzY2MGIzZmIyNWY4NzQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.kcH6crEkCx4xp1w4yIiSK8KUX-3MT1twI3SYHrOZW1M";

export const apiMovies = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: {
        Authorization: `Bearer ${API_BEARER_TOKEN}`,
        Accept: "application/json",
    },
});

export const apiMovieTheater = axios.create({
  baseURL: "https://pipocamania-295c5-default-rtdb.firebaseio.com/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
