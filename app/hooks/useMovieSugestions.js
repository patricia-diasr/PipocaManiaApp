import { useState, useEffect, useCallback } from "react";
import { getUpcomingMovies } from "../services/listService";
import { getAllMovieScreenings } from "../services/screeningsService";

function useMovieSugestions() {
  const [upcomingMovies, setUpcomingMovies] = useState(null);
  const [showingNow, setShowingNow] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMovieDetails = useCallback(async () => {
    try {
      setLoading(true); 
      const upcomingMovies = await getUpcomingMovies();
      const showingNowMovies = await getAllMovieScreenings();

      setUpcomingMovies(upcomingMovies);
      setShowingNow(showingNowMovies);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false); 
    }
  }, []);

  useEffect(() => {
    fetchMovieDetails(); 
  }, [fetchMovieDetails]);

  return { upcomingMovies, showingNow, error, loading, fetchMovieDetails }; 
}

export default useMovieSugestions;
