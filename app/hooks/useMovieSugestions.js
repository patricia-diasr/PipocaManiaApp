import { useState, useEffect, useCallback } from "react";
import { getUpcomingMovies } from "../services/listService";

function useMovieSugestions() {
  const [upcomingMovies, setUpcomingMovies] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMovieDetails = useCallback(async () => {
    try {
      setLoading(true); 
      const upcomingMovies = await getUpcomingMovies();
      setUpcomingMovies(upcomingMovies);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false); 
    }
  }, []);

  useEffect(() => {
    fetchMovieDetails(); 
  }, [fetchMovieDetails]);

  return { upcomingMovies, error, loading, fetchMovieDetails }; 
}

export default useMovieSugestions;
