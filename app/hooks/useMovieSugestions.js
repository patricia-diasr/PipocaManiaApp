import { useState, useEffect } from "react";
import { getUpcomingMovies } from "../services/listService";

function useMovieSugestions() {
    const [upcomingMovies, setUpcomingMovies] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const upcomingMovies = await getUpcomingMovies();
                setUpcomingMovies(upcomingMovies);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMovieDetails();
    }, []);

    return { upcomingMovies, error, loading };
}

export default useMovieSugestions;
