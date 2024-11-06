import { useState, useEffect } from "react";
import { getPopularMovies, searchMovies } from "../services/listService";

function useSearchMovies(search) {
    const [movies, setMovies] = useState(null);

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                if (search) {
                    const searchedMovies = await searchMovies(search);
                    setMovies(searchedMovies);
                } else {
                    const popularMovies = await getPopularMovies();
                    setMovies(popularMovies);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, [search]);

    return { movies, error, loading };
}

export default useSearchMovies;
